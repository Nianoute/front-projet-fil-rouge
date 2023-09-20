import { useContext, useEffect, useState } from "react";
import { getOneCategory } from "../../../setup/services/category.service";
import { Link, useParams } from "react-router-dom";
import GetAllPostDesign from "../../components/post/DesignPost";
import { createCategoryLikeByUser, deleteCategoryLikeByUser, getOneCategoryLikeByUser } from "../../../setup/services/likeCategory";
import { UserContext } from "../../../setup/contexts/UserContext";

const OneCategoryPage = () => {
    const { id } = useParams();
    const [category, setCategory] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        getOneCategory(id)
            .then((category) => {
                setCategory(category);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

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
            <div className="onePostPage">
                {category && (
                    <div className="detailPostHeader">
                        <div className="detailPost">
                            <h2>{category.name}</h2>
                            <div className="detailPostInfosPrimary">
                                <div className="detailPostImage">
                                    {category.imageCategory !== "" ? (
                                        <img src={category.imageCategory} alt="not found" />
                                    ) : (
                                        <img src="/noCat.png" alt="not found" />
                                    )}
                                </div>
                            </div>
                            <div className="detailPostInfosSecondary">
                                <div className="detailPostSecondary">
                                    <h3>Description :</h3>
                                    {category.description === "" ? (
                                        <p className="description">Cette publication ne possède pas de description</p>
                                    ) : (
                                        <p className="description">{category.description}</p>
                                    )}
                                </div>
                                {category.parent && (
                                    <div className="detailPostSecondary">
                                        <h3>Catégorie parent :</h3>
                                        <div className="category" key={category.parent.id}>
                                            <Link to={`/categories/${category.parent.id}`}>
                                                <img src={category.parent.imageCategory} alt="category" />
                                                <p>{category.parent.name}</p>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {category.children?.length !== 0 && (
                                    <div className="detailPostSecondary">
                                        <h3>Catégories enfants :</h3>
                                        <div className="categories">
                                            {category?.children?.map((child) => (
                                                <div className="category" key={child.id}>
                                                    <Link to={`/categories/${child.id}`}>
                                                        <img src={child.imageCategory} alt="category" />
                                                        <p>{child.name}</p>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="detailPostSecondary">
                                    <h3>Posts de la catégorie:</h3>
                                    <div className="home">
                                        {category?.posts?.length !== 0 ? (
                                            <div className="allPostDesign">
                                                {category.posts?.map((post) => (
                                                    <div key={post.id}>
                                                        <div className='onePost'>
                                                            <GetAllPostDesign post={post} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="noPost">
                                                <Link to="/newpost">
                                                    <div className="noPost_relative">
                                                        <div className="noPost_message">
                                                            <div className="noPost_message_icon">
                                                                <img src="/notFound.png" alt="notFoundImage" />
                                                            </div>
                                                            <h4>Aucun post ne correspond à votre recherche</h4>
                                                            <p>Créer le 1er post qui correspond à votre demande</p>
                                                            <button className="button">Créer un post</button>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {user ? (
                                <div className="likeCategory">
                                    {!categoryIsLiked ? (
                                        <div className="likeIcon cursor" onClick={likeCategory}>
                                            <img src="/coeur-vide.png" alt="coeur_vide" />
                                            <p>{category.likesCategory?.length}</p>
                                        </div>
                                    ) : (
                                        <div className="likeIcon cursor" onClick={removeLikeCategory}>
                                            <img src="/coeur-remplie.png" alt="coeur_remplie" />
                                            <p>{category.likesCategory?.length}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="likeCategory">
                                    <div className="likeIcon">
                                        <img src="/coeur-vide.png" alt="coeur_vide" />
                                        <p>{category.likesCategory?.length}</p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                )}
            </div>
        </>
    )
};

export default OneCategoryPage;