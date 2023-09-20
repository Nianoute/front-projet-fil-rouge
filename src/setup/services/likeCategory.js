import axios from "axios";

const createCategoryLikeByUser = async (data) => {
    const token = localStorage.getItem("access_token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(
        `${process.env.REACT_APP_API}/likesCategory`,
        data,
        config
    );
    return response.data;
};

const getOneCategoryLikeByUser = async (data) => {
    const token = localStorage.getItem("access_token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(
        `${process.env.REACT_APP_API}/likesCategory/user/${data}`,
        config
    );
    return response.data;
}

const deleteCategoryLikeByUser = async (data) => {
    const response = await axios.delete(
        `${process.env.REACT_APP_API}/likesCategory/${data}`
    );
    return response.data;
}

export { createCategoryLikeByUser, getOneCategoryLikeByUser, deleteCategoryLikeByUser };