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
        categories: []
    });

    useEffect(()=>{
        getOnePost(id).then((post) => {
          post.categories = [];
          setPost(post);
        });
    }, [id])


    const onChangePost = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
      };
    
    const onChangeCategories = (e) => {
      const newCategories = [...post.categories];
      if (e.target.checked) {
        let index = {id: +e.target.value};
        newCategories.push(index);
      } else {
        const index = newCategories.indexOf(e.target.value);
        newCategories.splice(index, 1);
      }
      setPost({ ...post, categories: newCategories });
    };
    
      const handleUpdatePost = (e) => {
        e.preventDefault();

        if (post.categories.length === 0){
          post.categories = [];
        }

        console.log(post);

        updatePost(id, post)
            .then(() => {
              navigate(`/`);
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
            <h1>Modification d'un post</h1>
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