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
          console.log(categories)
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    const [post, setPost] = useState({
        title: "",
        description: "",
        author: "",
        category: "",
        category2: "",
    });

    const onChangePost = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
      };
    
      const handleCreatePost = (e) => {
        e.preventDefault();
          if (user.id){
            post.author = user.id;
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
      <>
        <h1>Creation d'un post</h1>
        <form onSubmit={handleCreatePost}>
            <label>
                Le titre:
                <input type="text" onChange={onChangePost} value={post.title} name="title" />
            </label>
            <label>
                La description:
                <input type="text" onChange={onChangePost} value={post.description} name="description" />
            </label>

            <label>
              Choix catégory
              <select name="category" onChange={onChangePost}>
                  <option value="">--Aucun--</option>
                  {categories?.map((category) => (
                      <option value={category.id} key={category.id}>--{category.name}--</option>
                 ))}
              </select>
            </label>
                  
            
            {post.category?  
              <label>            
                Choix catégory 2
                <select name="category2" onChange={onChangePost}>
                    <option value="">--Aucun--</option>
                    {categories?.map((category) => (
                        <option value={category.id} key={category.id}>--{category.name}--</option>
                  ))}
                </select>
              </label>
            : <></>}
 
            

            <input type="submit" value="Submit" />
        </form>
      </>
    );
  };
  
  export default CreateNewPost;