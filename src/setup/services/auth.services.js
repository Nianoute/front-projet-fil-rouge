import axios from "axios";

const login = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/auth/signin`,
    data
  );
  return response.data;
};

const register = async (data) => {
    // convert the post object to a FormData object
    if(!data.files){
      console.log('posts without files');
      const response = await axios.post(`${process.env.REACT_APP_API}/auth/signup`, data)
      return response.data
    }
    const formData = new FormData();
  
    formData.append('avatar', data.avatar)  

    // FILES
    const files = Array.from(data.files)
    files.forEach((file, index) => {
      // console.log(file);
      formData.append('files', file)
    })
    
    const response = await axios.post(`${process.env.REACT_APP_API}/auth/signup`, formData, { formData: true })
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