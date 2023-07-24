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

  useEffect(() => {
    getOnePost(id).then((post) => {
      post.categories = [];
      setPost(post);
      console.log(post);
    });
  }, [id])


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

  const handleUpdatePost = (e) => {
    e.preventDefault();

    if (post.categories.length === 0) {
      post.categories = [];
    }

    console.log(post);

    updatePost(id, post, files)
      .then((response) => {
        navigate("/updatepost-variant", {
          state: {
            post: response,
          },
        });
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
                    <label>
                      <input type="text" onChange={onChangePost} value={post.webSite} name="webSite" className="inputForm" placeholder="webSite" />
                    </label>
                  </div>
                </div>

                <div className="formStep">
                  <div className="separator" />
                  <h2>Informations du post</h2>
                  <div className="oneLabel">
                    <label>
                      <input type="text" onChange={onChangePost} value={post.description} name="description" className="inputForm" placeholder="La description" />
                    </label>
                  </div>
                  <div className="oneLabel">
                    <label>
                      <input type="date" onChange={onChangePost} value={post.promoDuration} name="date" className="inputForm" placeholder="La date" />
                    </label>
                  </div>
                </div>

                <div className="formStep">
                  <div className="separator" />
                  <h2>Les prix</h2>
                  <div className="oneLabel">
                    <label>
                      <input type="number" onChange={onChangePost} value={post.price} name="price" className="inputForm" placeholder="Le prix actuel" />
                    </label>
                  </div>
                  <div className="oneLabel">
                    <label>
                      <input type="number" onChange={onChangePost} value={post.promoPrice} name="promoPrice" className="inputForm" placeholder="Le prix initial" />
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
            </div>
          )}
        </>
      )}

    </>

  );
};

export default UpdatePostPage;