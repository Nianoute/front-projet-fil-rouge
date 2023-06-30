import axios from "axios";

const login = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/auth/signin`,
    data
  );
  return response.data;
};

const register = async (data, files) => {
  if(files.length === 0){
    console.log('user without files');
    const response = await axios.post(`${process.env.REACT_APP_API}/auth/signup`, data)
    return response.data
  }
  
  const formData = new FormData();

  formData.append('userName', data.userName)
  formData.append('email', data.email)
  formData.append('password', data.password)

  //append files
  for (let i = 0; i < files.length; i++) {
    formData.append('file', files[i])
  }
  
  const response = await axios.post(`${process.env.REACT_APP_API}/auth/signup`, formData, { formData: true })
  return response.data
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