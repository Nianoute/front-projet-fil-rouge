import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPostVariantOfPost, deletePostVariantOfPost, getAllPostVariantOfPostByParentId } from "../../../../setup/services/postVariant.services";

const CreatePostVariant = () => {
    const location = useLocation();
    const post = location.state.post
    const navigate = useNavigate();
    const [postVariants, setPostVariants] = useState([]);
    const [postVariantActive, setPostVariantActive] = useState({
        title: "",
        description: post.description,
        price: post.price,
        promoPrice: post.promoPrice,
    });
    const [files, setFiles] = useState([]);

    const [error, setError] = useState(false);
    const [popUp, setPopUp] = useState(false);

    useEffect(() => {
        getAllPostVariantOfPostByParentId(post.id).then((postAllVariants) => {
            setPostVariants(postAllVariants);
        });
    }, [post.id]);

    const onChangePostVariantActive = (e) => {
        setPostVariantActive({ ...postVariantActive, [e.target.name]: e.target.value });
    };

    const onChangeFile = (e) => {
        setFiles(e.target.files);
    };

    const handleAddPost = async (e) => {
        e.preventDefault();
        postVariantActive.post = post.id;

        await createPostVariantOfPost(postVariantActive, files)
            .then((response) => {
                postVariants.push(response);
                setPostVariantActive({
                    title: "",
                    description: post.description,
                    price: post.price,
                    promoPrice: post.promoPrice,
                });
                setFiles([]);
                setPopUp(true);
            })
            .catch((err) => {
                console.log(err);
                setError(true);
            });
    }

    const deletePostVariant = async (e) => {
        e.preventDefault();
        const idOfTarget = e.target.parentNode.parentNode.id;
        const postVariant = postVariants[idOfTarget];
        await deletePostVariantOfPost(postVariant.id);

        setPostVariantActive({
            title: "",
            description: post.description,
            price: post.price,
            promoPrice: post.promoPrice,
        });

        getAllPostVariantOfPostByParentId(post.id).then((postAllVariants) => {
            setPostVariants(postAllVariants);
        });
    }

    const closePopUp = () => {
        setPopUp(false);
    }


    return (
        <div className="createPostVariant">
            <h1>Creation des variantes de posts</h1>
            <form onSubmit={handleAddPost} className="formCreatePost">
                <div className="formStep">
                    <div className="separator" />
                    <h2>Informations du post</h2>
                    <div className="oneLabel">
                        <label>
                            <input type="text" onChange={onChangePostVariantActive} value={postVariantActive.title} name="title" className="inputForm" placeholder="Le titre du post" />
                        </label>
                    </div>
                    <div className="oneLabel">
                        <label>
                            <input type="text" onChange={onChangePostVariantActive} value={postVariantActive.description} name="description" className="inputForm" placeholder="La description" />
                        </label>
                    </div>
                </div>

                <div className="formStep">
                    <div className="separator" />
                    <h2>Les prix</h2>
                    <div className="oneLabel">
                        <label>
                            <input type="number" onChange={onChangePostVariantActive} value={postVariantActive.promoPrice} name="promoPrice" className="inputForm" placeholder="Le prix actuel" />
                        </label>
                    </div>
                    <div className="oneLabel">
                        <label>
                            <input type="number" onChange={onChangePostVariantActive} value={postVariantActive.price} name="price" className="inputForm" placeholder="Le prix avant promotion" />
                        </label>
                    </div>
                </div>

                <div className="formStep">
                    <div className="separator" />
                    <h2>Les images</h2>
                    <div className="oneLabel">
                        <p className="extentions">
                            Extensions autorisées : <br />
                            Images : png, jpeg, webp <br />
                        </p>
                        <label htmlFor="file">Fichiers</label>
                        <input type="file" name="file" placeholder="Image" limit="5" size="5" accept="image/png, image/jpeg, image/webp" onChange={(e) => { onChangeFile(e) }}
                        />
                    </div>
                </div>

                <input type="submit" value="Ajouter" className="primaryBouton" />
                {error && <p className="error">Une erreur est survenue</p>}
            </form>

            {postVariants.length !== 0 && (
                <div className="postVariant">
                    <div className="separator" />
                    <h2>Les variantes de posts</h2>
                    {postVariants.map((postVariant, index) => (
                        <div key={index} className="cardOnePost" id={index}>
                            <div className="wrapper">
                                <div className="card__img">
                                    {postVariant.imagePostV !== "" ? (
                                        <img src={postVariant.imagePostV} alt="PostVariantAvecImage" />
                                    ) : (
                                        <>
                                            {post.imagePost !== "" && (
                                                <img src={post.image} alt="PostVariantAvecImagePost" />
                                            )}
                                            {post.imagePost === "" && (
                                                <img src="logo192.png" alt="PostVariantVide" />
                                            )}
                                        </>
                                    )}

                                </div>
                                <div className="card__infos">
                                    <h2>{postVariant.title}</h2>
                                    <p>{postVariant.description}</p>
                                </div>
                                <input type="submit" value="Supprimer" className="secondaryButon" onClick={deletePostVariant} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {popUp && (
                <div className="popUp">
                    <div className="popUpContent">
                        <div className="textPopUp">
                            <img src="postValide.png" alt="PostValide création" />
                            <h2>Le post a bien été créé</h2>
                            <div className="popUpButton">
                                <div className="backHome" onClick={() => navigate("/")}>
                                    Retour à l'accueil
                                </div>
                                <div className="createPostV" onClick={closePopUp}>
                                    Créer un post variant
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreatePostVariant