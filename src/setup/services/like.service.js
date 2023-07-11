import axios from "axios";

const token = localStorage.getItem("access_token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

console.log(config);

const createPostLikeByUser = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/likes`,
    data,
    config
  );
  return response.data;
};

const getOnePostLikeByUser = async (data) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API}/likes/user/${data}`,
    config
  );
  return response.data;
};

const deletePostLikeByUser = async (data) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_API}/likes/${data}`
  );
  return response.data;
};

export { createPostLikeByUser, getOnePostLikeByUser, deletePostLikeByUser };
