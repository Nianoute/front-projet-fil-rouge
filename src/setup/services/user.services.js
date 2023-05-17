import axios from "axios";

const getAllUsers = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/users`);
    return response.data;
  };

const updateUser = async (id, data) => {
    const response = await axios.put(`${process.env.REACT_APP_API}/users/${id}`, data);
    return response.data;
  };
  
export { getAllUsers, updateUser };