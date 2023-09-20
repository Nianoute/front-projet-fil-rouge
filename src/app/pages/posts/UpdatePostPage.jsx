import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../../../setup/services/category.service";
import { getOnePost, updatePost } from "../../../setup/services/post.services";

const UpdatePostPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [response, setResponse] = useState(false);
  const [promoDuration, setPromoDuration] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }
  }, []);

  useEffect(() => {
    getAllCategories()
      .then((categories) => {
        setCategories([...categories]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [post, setPost] = useState({});
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    getOnePost(id).then((post) => {
      post.categories = [];
      setPost(post);
      const thisPercent = Math.round((1 - post.promoPrice / post.price) * 100);
      setPercent(thisPercent);
    });
  }, [id])



  const onChangePost = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    if (e.target.name === "promoPrice" && e.target.value !== "" & e.target.value !== 0) {
      setPercent(Math.round((1 - e.target.value / post.price) * 100));
    }
    if (e.target.name === "price" && e.target.value !== "") {
      setPercent(Math.round((1 - post.promoPrice / e.target.value) * 100));
    }
  };

  const onChangePromoDuration = (e) => {
    setPromoDuration(e.target.value);
    setPost({ ...post, promoDuration: e.target.value });
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

  const handleUpdatePost = (e) => {
    e.preventDefault();

    if (post.categories.length === 0) {
      post.categories = [];
    }

    updatePost(id, post, files)
      .then((response) => {
        setResponse(response);
        setPopUp(true);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  const [files, setFiles] = useState([]);

  const onChangeFile = (e) => {
    setFiles(e.target.files);
  };

  const handleCreatePostVariant = (e) => {
    navigate("/updatepost-variant", {
      state: {
        post: response,
      },
    });
  };

  return (
    <>
      {post && (
        <>
          {post?.author?.id === user?.id && (

            <div className="createPost">
              <h1>Modification d'un post</h1>
              <form onSubmit={handleUpdatePost} className="formCreatePost">
                <div className="formStep">
                  <div className="separator" />
                  <h2>Lien du site</h2>
                  <div className="oneLabel">
                    <p className="labelTitle">Lien de la promotion:</p>
                    <label>
                      <input type="text" onChange={onChangePost} value={post.website} name="website" className="inputForm" placeholder="website" />
                    </label>
                  </div>
                </div>

                <div className="formStep">
                  <div className="separator" />
                  <h2>Informations du post</h2>
                  <div className="oneLabel">
                    <label>
                      <p className="labelTitle">Description:</p>
                      <input type="text" onChange={onChangePost} value={post.description} name="description" className="inputForm" placeholder="La description" />
                    </label>
                  </div>
                  <div className="oneLabel">
                    <p className="labelTitle">Durée de la promotion:</p>
                    <label>
                      <input type="date" onChange={onChangePromoDuration} value={promoDuration} name="date" className="inputForm" placeholder="La date" />
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
                            <input type="checkbox" onChange={onChangeCategories} value={category.id} name="categories" />
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {post?.imagePost === "" && (
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
                )}


                <input type="submit" value="Submit" className="primaryBouton" />
                {error && <p className="error">Une erreur est survenue</p>}
              </form>

              {popUp && (
                <div className="popUp">
                  <div className="popUpContent">
                    <div className="textPopUp">
                      <img src="/postValide.png" alt="PostValide création" />
                      <h2>La publication a bien été modifier</h2>
                      <div className="popUpButton">
                        <div className="backHome" onClick={() => navigate("/")}>
                          Retour à l'accueil
                        </div>
                        <div className="createPostV" onClick={handleCreatePostVariant}>
                          Modifier les posts variants
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

    </>

  );
};

export default UpdatePostPage;