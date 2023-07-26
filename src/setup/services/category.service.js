import axios from "axios";

const getAllCategories = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}/categories`);
  console.log(response.data);
  return response.data;
};

const createCategory = async (data) => {
  const token = localStorage.getItem("access_token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${process.env.REACT_APP_API}/categories`, data, config);
  return response.data;
};

export { getAllCategories, createCategory };