import axios from "axios";

const getAllUsers = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/users`);
    return response.data;
  };
  
export { getAllUsers };