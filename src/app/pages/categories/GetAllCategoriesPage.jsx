import { useEffect, useState } from "react";
import { getAllCategories } from "../../../setup/services/category.service";
import { Link } from "react-router-dom";

const GetAllCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories()
            .then((categories) => {
                setCategories([...categories]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="allCategories">
            <h1>Les Categories</h1>
            {categories?.map((category) => {
                return (
                    <Link to={`/category/${category.id}`} key={category.id}>
                        <div key={category.id}>
                            <h2>{category.name}</h2>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
};

export default GetAllCategories;