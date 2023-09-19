import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../../setup/services/category.service";
import { createPost } from "../../../setup/services/post.services";

const CreateNewPost = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    getAllCategories()
      .then((categories) => {
        setCategories([...categories]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [post, setPost] = useState({
    webSite: "",
    title: "",
    description: "",
    promoDuration: "",
    price: 0,
    promoPrice: 0,
    categories: [],
    postVariants: [],
  });

  const onChangePost = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const onChangeCategories = (e) => {
    const newCategories = [...post.categories];
    if (e.target.checked) {
      let index = { id: +e.target.value };
      newCategories.push(index);
    } else {
      const index = newCategories.indexOf(e.target.value);
      newCategories.splice(index, 1);
    }
    setPost({ ...post, categories: newCategories });
  };

  const [files, setFiles] = useState([]);

  const onChangeFile = (e) => {
    setFiles(e.target.files);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (post.categories.length === 0) {
      post.categories = [];
    }

    if (post.promoDuration === "") {
      post.promoDuration = null;
    }

    try {
      await createPost(post, files)
        .then((response) => {
          setPopUp(true);
          setResponse(response);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatePostVariant = (e) => {
    e.preventDefault();
    console.log(response);
    navigate("/newpost-variant", {
      state: {
        post: response,
      },
    });
  };

  return (
    <div className="createPost">
      <h1>Creation d'un post</h1>
      <form onSubmit={handleCreatePost} className="formCreatePost">
        <div className="formStep">
          <div className="separator" />
          <h2>Lien du site</h2>
          <div className="oneLabel">
            <label>
              <input
                type="text"
                onChange={onChangePost}
                value={post.webSite}
                name="webSite"
                className="inputForm"
                placeholder="webSite"
              />
            </label>
          </div>
        </div>

        <div className="formStep">
          <div className="separator" />
          <h2>Informations du post</h2>
          <div className="oneLabel">
            <label>
              <input
                type="text"
                onChange={onChangePost}
                value={post.title}
                name="title"
                className="inputForm"
                placeholder="Le titre du post"
              />
            </label>
          </div>
          <div className="oneLabel">
            <label>
              <input
                type="text"
                onChange={onChangePost}
                value={post.description}
                name="description"
                className="inputForm"
                placeholder="La description"
              />
            </label>
          </div>
          <div className="oneLabel">
            <label>
              <input
                type="date"
                onChange={onChangePost}
                value={post.promoDuration}
                name="promoDuration"
                className="inputForm"
                placeholder="La date de fin de promotion"
              />
            </label>
          </div>
        </div>

        <div className="formStep">
          <div className="separator" />
          <h2>Les prix</h2>
          <div className="oneLabel">
            <label>
              <input
                type="number"
                onChange={onChangePost}
                value={post.promoPrice}
                name="promoPrice"
                className="inputForm"
                placeholder="Le prix actuel"
              />
            </label>
          </div>
          <div className="oneLabel">
            <label>
              <input
                type="number"
                onChange={onChangePost}
                value={post.price}
                name="price"
                className="inputForm"
                placeholder="Le prix avant promotion"
              />
            </label>
          </div>
        </div>

        {categories?.length !== 0 && (
          <div className="formStep">
            <div className="separator" />
            <h2>Les catégories</h2>
            <div className="oneLabel">
              {categories?.map((category) => (
                <div key={category.id}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={onChangeCategories}
                      value={category.id}
                      name="categories"
                    />
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="formStep">
          <div className="separator" />
          <h2>Les images</h2>
          <div className="oneLabel">
            <p className="extentions">
              Extensions autorisées : <br />
              Images : png, jpeg, webp <br />
            </p>
            <label htmlFor="file">Fichiers</label>
            <input
              type="file"
              name="file"
              placeholder="Image"
              limit="5"
              size="5"
              accept="image/png, image/jpeg, image/webp"
              onChange={(e) => {
                onChangeFile(e);
              }}
            />
          </div>
        </div>

        <input type="submit" value="Submit" className="primaryBouton" />
        {error && <p className="error">Une erreur est survenue</p>}
      </form>

      {popUp && (
        <div className="popUp">
          <div className="popUpContent">
            <div className="textPopUp">
              <img src="postValide.png" alt="PostValide création" />
              <h2>Le post a bien été créé</h2>
              <div className="popUpButton">
                <div className="backHome" onClick={() => navigate("/")}>
                  Retour à l'accueil
                </div>
                <div className="createPostV" onClick={handleCreatePostVariant}>
                  Créer un post variant
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewPost;