import axios from "axios";

  const getAllPosts = async (filter = {categories: "", title: ""}) => {  
    const { categories, title } = filter;
    const response = await axios.get(
      `${process.env.REACT_APP_API}/posts?categories=${categories}&title=${title}`
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
    console.log(data, id);
    const response = await axios.put(`${process.env.REACT_APP_API}/posts/${id}`, data);
    console.log(response.data);
    return response.data;
  };
  
  const deletePost = async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/posts/${id}`
    );
    return response.data;
  };
  
  export { getAllPosts, getOnePost, updatePost, deletePost, createPost };