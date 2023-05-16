import axios from "axios";

const login = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/auth/signin`,
    data
  );
  return response.data;
};

const register = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/auth/signup`,
    data
  );
  return response.data;
};

const forgotPassword = async (data) => {
  const response = await axios.post(`${process.env.REACT_APP_API}/auth/forgot-password`, data);
  return response.data;
};

const resetPassword = async (token, data) => {
  const response = await axios.post(`${process.env.REACT_APP_API}/auth/reset-password/${token}`, data);
  return response.data;
};

export { login, register, resetPassword, forgotPassword };