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
    website: "https://www.google.com/",
    title: "Un exemple de titre",
    description: "Un exemple de description",
    promoDuration: "",
    price: 10,
    promoPrice: 8,
    categories: [],
    postVariants: [],
  });

  const [percent, setPercent] = useState(25);

  const onChangePost = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    if (e.target.name === "promoPrice" && e.target.value !== "" & e.target.value !== 0) {
      setPercent(Math.round((1 - e.target.value / post.price) * 100));
    }
    if (e.target.name === "price" && e.target.value !== "") {
      setPercent(Math.round((1 - post.promoPrice / e.target.value) * 100));
    }
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

    if (post.title === "") {
      post.title = null;
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
              <p className="labelTitle">Lien de la promotion:</p>
              <input
                type="text"
                onChange={onChangePost}
                value={post.website}
                name="website"
                className="inputForm"
                placeholder="website"
              />
            </label>
          </div>
        </div>

        <div className="formStep">
          <div className="separator" />
          <h2>Informations du post</h2>
          <div className="oneLabel">
            <label>
              <p className="labelTitle">Titre:</p>
              <input
                type="text"
                onChange={onChangePost}
                value={post.title}
                name="title"
                className="inputForm"
                placeholder="Le titre du post"
                required
              />
            </label>
          </div>
          <div className="oneLabel">
            <label>
              <p className="labelTitle">Description:</p>
              <textarea
                name="description"
                rows="10"
                placeholder="Description"
                onChange={onChangePost}
                value={post.description}
                className="commentDescription"
              ></textarea>
            </label>
          </div>
          <div className="oneLabel">
            <label>
              <p className="labelTitle">Durée de la promotion:</p>
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
          <div className="twoLabel">
            <div className="oneLabel margin">
              <label>
                <p className="labelTitle">Prix après la promotion:</p>
                <input
                  type="number"
                  onChange={onChangePost}
                  value={post.promoPrice}
                  name="promoPrice"
                  className="inputForm"
                  placeholder="Le prix actuel"
                  required
                />
              </label>
            </div>
            <div className="oneLabel margin">
              <label>
                <p className="labelTitle">Prix initial / Prix avant promotion:</p>
                <input
                  type="number"
                  onChange={onChangePost}
                  value={post.price}
                  name="price"
                  className="inputForm"
                  placeholder="Le prix avant promotion"
                  required
                />
              </label>
            </div>
          </div>
          <div className="percent">
            <p className="labelTitle">Pourcentage de réduction:</p>
            <p className="percentValue">{percent}%</p>
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