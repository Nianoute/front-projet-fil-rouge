import axios from "axios";

const createPostCommentByUser = async (data) => {
  const token = localStorage.getItem("access_token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${process.env.REACT_APP_API}/comments`,
    data,
    config
  );
  return response.data;
};

const getAllPostComments = async (data) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API}/comments/post/${data}`
  );
  return response.data;
};

export { createPostCommentByUser, getAllPostComments };
