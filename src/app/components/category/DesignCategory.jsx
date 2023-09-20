import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../setup/contexts/UserContext";
import { createCategoryLikeByUser, deleteCategoryLikeByUser, getOneCategoryLikeByUser } from "../../../setup/services/likeCategory";
import { Link } from "react-router-dom";

export default function DesignCategory({ category }) {
    const { user } = useContext(UserContext);

    const [categoryIsLiked, setCategoryIsLiked] = useState(false);

    useEffect(() => {
        if (user) {
            getOneCategoryLikeByUser(category.id).then((like) => {
                setCategoryIsLiked(like);
            });

        }
    }, [user, category]);

    const likeCategory = () => {
        if (user) {
            const data = {
                categoryLikes: category.id,
            };
            createCategoryLikeByUser(data).then((like) => {
                setCategoryIsLiked(like);
            });
        }
    };

    const removeLikeCategory = () => {
        if (user && categoryIsLiked) {
            deleteCategoryLikeByUser(categoryIsLiked.id).then(() => {
                setCategoryIsLiked(false);
            });
        }
    };

    return (
        <>
            <Link to={`/categories/${category.id}`}>
                <div className="OneCategory">
                    <div className="categoryImage">
                        {category.imageCategory !== "" ? (
                            <img src={category.imageCategory} alt="category" />
                        ) : (
                            <img src="/noCat.png" alt="noCategory" />
                        )}
                    </div>
                    <div className="categoryName">
                        <h3>{category.name}</h3>
                    </div>
                </div>
            </Link>
            {user ? (
                <div className="likeCategory">
                    {!categoryIsLiked ? (
                        <div className="likeIcon cursor" onClick={likeCategory}>
                            <img src="coeur-vide.png" alt="coeur_vide" />
                            <p>{category.likesCategory?.length}</p>
                        </div>
                    ) : (
                        <div className="likeIcon cursor" onClick={removeLikeCategory}>
                            <img src="coeur-remplie.png" alt="coeur_remplie" />
                            <p>{category.likesCategory?.length}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="likeCategory">
                    <div className="likeIcon">
                        <img src="coeur-vide.png" alt="coeur_vide" />
                        <p>{category.likesCategory?.length}</p>
                    </div>
                </div>
            )}
        </>
    )
}