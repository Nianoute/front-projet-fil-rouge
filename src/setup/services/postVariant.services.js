import axios from "axios";

 const createPostVariantOfPost = async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_API}/post-variants`, data)
    return response.data;
  };
  
  export { createPostVariantOfPost };