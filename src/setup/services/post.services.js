import axios from "axios";

const getAllPosts = async (
  filter = {
    categories: ""
  }
) => {
    const { categories } = filter;
    const response = await axios.get(
      `${process.env.REACT_APP_API}/posts?categories=${categories}`
    );
    return response.data;
  };
  
  const getOnePost = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_API}/posts/${id}`);
    return response.data;
  };
  
  const createPost = async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_API}/posts`, data)
    return response.data;
  };
  
  const updatePost = async (id, data) => {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/posts/${id}`,data
    );
    return response.data;
  };
  
  const deletePost = async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/posts/${id}`
    );
    return response.data;
  };
  
  export { getAllPosts, getOnePost, updatePost, deletePost, createPost };