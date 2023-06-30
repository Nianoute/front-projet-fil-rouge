import axios from "axios";

 const createPostVariantOfPost = async (data, files) => {
    if(files.length === 0){
      const response = await axios.post(`${process.env.REACT_APP_API}/post-variants`, data)
      return response.data;
    }

    const formData = new FormData();
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('webSite', data.webSite)
    formData.append('price', data.price)
    formData.append('promoPrice', data.promoPrice)
    formData.append('post', data.post)


    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i])
    }

    const response = await axios.post(`${process.env.REACT_APP_API}/post-variants`, formData, { formData: true })
    return response.data;
  };

const deletePostVariantOfPost = async (id) => {
    const response = await axios.delete(`${process.env.REACT_APP_API}/post-variants/${id}`)
    return response.data;
  };

const getAllPostVariantOfPostByParentId = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_API}/post-variants/post/${id}`)
    return response.data;
  };

  
  export { createPostVariantOfPost, deletePostVariantOfPost, getAllPostVariantOfPostByParentId };