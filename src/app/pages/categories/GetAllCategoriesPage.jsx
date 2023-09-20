import { useContext, useEffect, useState } from "react";
import { deleteCategory, getAllCategories } from "../../../setup/services/category.service";
import DesignCategory from "../../components/category/DesignCategory";
import { UserContext } from "../../../setup/contexts/UserContext";

const GetAllCategories = () => {
    const [categories, setCategories] = useState([]);

    const { user } = useContext(UserContext);

    const handleDelete = (e) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
            deleteCategory(e.target.id)
                .then(() => {
                    getAllCategories()
                        .then((categories) => {
                            setCategories([...categories]);
                        })
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

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
            <h2>Les Categories</h2>
            {categories?.length === 0 ? (
                <div className="notFound">
                    <img src="/noCat.png" alt="noCategories" />
                    <p>Il n'y a pas de catégories pour le moment</p>
                </div>
            ) : (
                <div className="wrap">
                    {categories?.map((category) => {
                        return (
                            <div className="relative" key={category.id}>
                                <div key={category.id}>
                                    <DesignCategory category={category} />
                                </div>
                                {user?.admin && (
                                    <div className="supprimer" onClick={handleDelete} id={category.id}>
                                        <img src="/sup.png" alt="sup" id={category.id} />
                                    </div>
                                )}

                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default GetAllCategories;