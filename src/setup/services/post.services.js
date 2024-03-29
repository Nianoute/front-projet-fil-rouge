import axios from "axios";

const getAllPosts = async (filter = { categories: "", title: "", like: "", date: "" }) => {
  const { categories, title, like, date } = filter;
  const response = await axios.get(
    `${process.env.REACT_APP_API}/posts?categories=${categories}&title=${title}&like=${like}&date=${date}`
  );
  return response.data;
};

const getAllPostsByUser = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API}/posts/user/${id}`
  );
  return response.data;
};

const getOnePost = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API}/posts/${id}`);
  return response.data;
};

const createPost = async (data, files) => {
  const token = localStorage.getItem("access_token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  if (files.length === 0) {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/posts`,
      data,
      config
    );
    return response.data;
  }

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("promoDuration", data.promoDuration);
  formData.append("website", data.website);
  formData.append("price", data.price);
  formData.append("promoPrice", data.promoPrice);
  formData.append("author", data.author);
  formData.append("categories", data.categories);

  for (let i = 0; i < files.length; i++) {
    formData.append("file", files[i]);
  }

  const response = await axios.post(
    `${process.env.REACT_APP_API}/posts`,
    formData,
    config,
    { formData: true }
  );
  return response.data;
};

const updatePost = async (id, data, files) => {
  const token = localStorage.getItem("access_token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  if (files.length === 0) {
    const response = await axios.put(
      `${process.env.REACT_APP_API}/posts/${id}`,
      data,
      config
    );
    return response.data;
  }

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("promoDuration", data.promoDuration);
  formData.append("website", data.website);
  formData.append("price", data.price);
  formData.append("promoPrice", data.promoPrice);
  formData.append("categories", data.categories);

  for (let i = 0; i < files.length; i++) {
    formData.append("file", files[i]);
  }

  const response = await axios.put(
    `${process.env.REACT_APP_API}/posts/${id}`,
    formData,
    config,
    { formData: true }
  );
  return response.data;
};

const deletePost = async (id) => {
  const token = localStorage.getItem("access_token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(
    `${process.env.REACT_APP_API}/posts/${id}`,
    config
  );
  return response.data;
};

export { getAllPosts, getAllPostsByUser, getOnePost, updatePost, deletePost, createPost };
