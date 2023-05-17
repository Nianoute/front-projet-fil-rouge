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
        // category: "",
        // category2: "",
    });

    useEffect(()=>{
        getOnePost(id).then((post) => {
            setPost(post);
            console.log(post.categories[0].name);
        });
    }, [id])


    const onChangePost = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
      };
    
      const handleUpdatePost = (e) => {
        e.preventDefault();
          if (post.category !== "") {
            if (post.category2 !== "" && post.category2 !== post.category){ 
              post.categories = [{id: +post.category}, {id: +post.category2}]
            } else {   
              post.categories = [{id: +post.category}]
            }
          } else {
            post.categories = [];
          }
          updatePost(id, post)
            .then(() => {
            //   navigate(`/`);
            })
            .catch((err) => {
              console.log(err);
            });
      };
      
      
    return (
    <>
        {post && (
            <>
            {post?.author?.id === user?.id &&(

                <div className="createPost">
            <h1>Creation d'un post</h1>
            <form onSubmit={handleUpdatePost} className="formCreatePost">
                <div className="formStep">
                  <div className="separator"/>
                  <h2>Lien du site</h2>
                  <div className="oneLabel">
                    <label>
                        <input type="text" onChange={onChangePost} value={post.webSite} name="webSite" className="inputForm" placeholder="webSite"/>
                    </label>
                  </div>
                </div>
    
                <div className="formStep">
                  <div className="separator"/>
                  <h2>Informations du post</h2>
                  <div className="oneLabel">
                    <label>
                        <input type="text" onChange={onChangePost} value={post.title} name="title" className="inputForm" placeholder="Le titre du post"/>
                    </label>
                  </div>
                  <div className="oneLabel">
                    <label>
                        <input type="text" onChange={onChangePost} value={post.description} name="description" className="inputForm" placeholder="La description"/>
                    </label>
                  </div>
                </div>
    
                <div className="formStep">
                  <div className="separator"/>
                  <h2>Les prix</h2>
                  <div className="oneLabel">
                    <label>
                        <input type="number" onChange={onChangePost} value={post.priceNow} name="priceNow" className="inputForm" placeholder="Le prix actuel"/>
                    </label>
                  </div>
                  <div className="oneLabel">
                  <label>
                      <input type="number" onChange={onChangePost} value={post.priceInit} name="priceInit" className="inputForm" placeholder="Le prix initial"/>
                  </label>
                  </div>
                </div>
    
                <div className="formStep">
                  <div className="separator"/>
                  <h2>Les catégories</h2>
                  <div className="oneLabel">
                    <label>
                      <select name="category" onChange={onChangePost} className="select">
                          <option value={post?.categories[0]?.name}>{post.category}</option>
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
                            <option value={post?.categories[1]?.name}>--Aucun--</option>
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
            )}
          </>
          )}
        
    </>
      
    );
  };
  
  export default UpdatePostPage;