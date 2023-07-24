import axios from "axios";

const createPostLikeByUser = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/likes`,
    data
  );
  return response.data;
};

const getOnePostLikeByUser = async (data) => {
  const token = localStorage.getItem("access_token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
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
