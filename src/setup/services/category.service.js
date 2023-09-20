import axios from "axios";

const getAllCategories = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}/categories`);
  return response.data;
};

const createCategory = async (data, files) => {
  const token = localStorage.getItem("access_token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  if (files.length === 0) {
    const response = await axios.post(`${process.env.REACT_APP_API}/categories`, data, config);
    return response.data;
  }

  const formData = new FormData();
  formData.append("name", data.name)
  formData.append("description", data.description)
  if (data.parent) {
    formData.append("parent", data.parent)
  }

  for (let i = 0; i < files.length; i++) {
    formData.append("file", files[i]);
  }

  const response = await axios.post(`${process.env.REACT_APP_API}/categories`, formData, config, { formData: true });
  return response.data;


};

const getOneCategory = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API}/categories/${id}`);
  return response.data;
}

export { getAllCategories, createCategory, getOneCategory };