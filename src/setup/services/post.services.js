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
  
  const createPost = async (data, files) => {
    console.log(data, files);
    if(files.length === 0){
      console.log('post without files');
      const response = await axios.post(`${process.env.REACT_APP_API}/posts`, data)
      return response.data;
    }

    const formData = new FormData();
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('webSite', data.webSite)
    formData.append('price', data.price)
    formData.append('promoPrice', data.promoPrice)
    formData.append('author', data.author)
    formData.append('categories', data.categories)


    //append files
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i])
    }

    const response = await axios.post(`${process.env.REACT_APP_API}/posts`, formData, { formData: true })
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