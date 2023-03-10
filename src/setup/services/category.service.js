import axios from "axios";

const getAllCategories = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/categories`);
    return response.data;
  };
  
  export { getAllCategories };