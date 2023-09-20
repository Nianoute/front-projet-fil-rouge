import { useEffect, useState } from "react";
import { getOneCategory } from "../../../setup/services/category.service";
import { useParams } from "react-router-dom";

const OneCategoryPage = () => {
    const { id } = useParams();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        getOneCategory(id)
            .then((category) => {
                setCategory([...category]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="allCategories">
            <h1>OneCategory</h1>
            {category && (
                <div key={category._id}>
                    <h2>{category.name}</h2>
                </div>
            )}
        </div>
    );
};

export default OneCategoryPage;