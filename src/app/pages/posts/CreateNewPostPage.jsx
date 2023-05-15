import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../../setup/services/category.service";
import { createPost } from "../../../setup/services/post.services";

const CreateNewPost = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);

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

    const [post, setPost] = useState({
        webSite: "",
        title: "",
        description: "",
        priceNow: 0,
        priceInit: 0,
        category: "",
        category2: "",
    });

    const onChangePost = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
      };
    
      const handleCreatePost = (e) => {
        e.preventDefault();
          if (user){
            if (user.id){
              post.author = user.id;
            } else {
              post.author = "";
            }
          }
          if (post.category !== "") {
            if (post.category2 !== "" && post.category2 !== post.category){ 
              post.categories = [{id: +post.category}, {id: +post.category2}]
            } else {   
              post.categories = [{id: +post.category}]
            }
          }
          createPost(post)
            .then(() => {
              navigate(`/`);
            })
            .catch((err) => {
              console.log(err);
            });
      };
      
      
    return (
      <div className="createPost">
        <h1>Creation d'un post</h1>
        <form onSubmit={handleCreatePost} className="formCreatePost">
            <div className="formStep">
              <h2>Lien du site</h2>
              <div className="oneLabel">
                <label>
                    <p>webSite:</p>
                    <input type="text" onChange={onChangePost} value={post.webSite} name="webSite" className="inputForm"/>
                </label>
              </div>
            </div>

            <div className="formStep">
              <h2>Informations du post</h2>
              <div className="oneLabel">
                <label>
                    <p>Le titre:</p>
                    <input type="text" onChange={onChangePost} value={post.title} name="title" className="inputForm"/>
                </label>
              </div>
              <div className="oneLabel">
                <label>
                    <p>La description:</p>
                    <input type="text" onChange={onChangePost} value={post.description} name="description" className="inputForm"/>
                </label>
              </div>
            </div>

            <div className="formStep">
              <h2>Les prix</h2>
              <div className="oneLabel">
                <label>
                    <p>Le prix actuel:</p>
                    <input type="number" onChange={onChangePost} value={post.priceNow} name="priceNow" className="inputForm"/>
                </label>
              </div>
              <div className="oneLabel">
              <label>
                  <p>Le prix initial:</p>
                  <input type="number" onChange={onChangePost} value={post.priceInit} name="priceInit" className="inputForm"/>
              </label>
              </div>
            </div>

            <div className="formStep">
              <h2>Les catégories</h2>
              <div className="oneLabel">
                <label>
                  <p>Choix catégory</p>
                  <select name="category" onChange={onChangePost} className="select">
                      <option value="">--Aucun--</option>
                      {categories?.map((category) => (
                          <option value={category.id} key={category.id}>--{category.name}--</option>
                    ))}
                  </select>
                </label>
              </div>
                    
              
              {post.category? 
                <div className="oneLabel"> 
                  <label>            
                    <p>Choix catégory 2</p>
                    <select name="category2" onChange={onChangePost} className="select">
                        <option value="">--Aucun--</option>
                        {categories?.map((category) => (
                            <option value={category.id} key={category.id}>--{category.name}--</option>
                      ))}
                    </select>
                  </label>
                </div>
              : <></>}
            </div>
 

            <input type="submit" value="Submit" className="primaryBouton"/>
        </form>
      </div>
    );
  };
  
  export default CreateNewPost;