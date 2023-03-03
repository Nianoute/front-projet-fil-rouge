import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../../setup/services/post.services";

const CreateNewPost = (data) => {
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: "",
        description: "",
    });

    const onChangePost = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
      };
    
      const handleCreatePost = (e) => {
        e.preventDefault();
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
        <form onSubmit={handleCreatePost}>
            <label>
                Le titre:
                <input type="text" onChange={onChangePost} value={post.title} name="title" />
            </label>
            <label>
                La description:
                <input type="text" onChange={onChangePost} value={post.description} name="description" />
            </label>
            <input type="submit" value="Submit" />
        </form>
      </>
    );
  };
  
  export default CreateNewPost;