import axios from "axios";

const getAllUsers = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/users`);
    return response.data;
  };

const getUserById = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_API}/users/${id}`);
    return response.data;
  };

const updateUser = async (id, data) => {
    const response = await axios.put(`${process.env.REACT_APP_API}/users/${id}`, data);
    return response.data;
  };

const updateFileUser = async (id, files) => {
    
    const formData = new FormData();
    //append files
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i])
    }
    
    const response = await axios.patch(`${process.env.REACT_APP_API}/users/${id}`, formData, { formData: true })
    return response.data
  };
  
export { getAllUsers, updateUser, updateFileUser, getUserById };