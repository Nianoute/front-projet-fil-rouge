import { useEffect, useState } from "react";
import { updatePostVariantOfPost } from "../../../../setup/services/postVariant.services";

const UpdateOnePostVariant = (onePostVariant) => {
    const [postVariant, setPostVariant] = useState();

    const [files, setFiles] = useState([]);

    const [error, setError] = useState(false);

    useEffect(() => {
        setPostVariant(onePostVariant.onePostVariant);
    }, [onePostVariant]);

    const onChangePostVariant = (e) => {
        setPostVariant({ ...postVariant, [e.target.name]: e.target.value });
    };

    const onChangeFile = (e) => {
        setFiles(e.target.files[0]);
    };

    const handleUpdatePostVariant = (e) => {
        e.preventDefault();
        console.log(postVariant);
        updatePostVariantOfPost(postVariant.id, postVariant, files)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
                setError(true);
            });
    };

    return (
        <>
            {postVariant && (
                <div className="createPost">
                    <h1>Modification d'un post</h1>
                    <form onSubmit={handleUpdatePostVariant} className="formCreatePost">
                        <div className="formStep">
                            <div className="separator" />
                            <h2>Informations du post</h2>
                            <div className="oneLabel">
                                <label>
                                    <input type="text" onChange={onChangePostVariant} value={postVariant.title} name="title" className="inputForm" placeholder="title" />
                                </label>
                            </div>
                            <div className="oneLabel">
                                <label>
                                    <input type="text" onChange={onChangePostVariant} value={postVariant.description} name="description" className="inputForm" placeholder="La description" />
                                </label>
                            </div>
                        </div>

                        <div className="formStep">
                            <div className="separator" />
                            <h2>Les prix</h2>
                            <div className="oneLabel">
                                <label>
                                    <input type="number" onChange={onChangePostVariant} value={postVariant.price} name="price" className="inputForm" placeholder="Le prix actuel" />
                                </label>
                            </div>
                            <div className="oneLabel">
                                <label>
                                    <input type="number" onChange={onChangePostVariant} value={postVariant.promoPrice} name="promoPrice" className="inputForm" placeholder="Le prix initial" />
                                </label>
                            </div>
                        </div>

                        {postVariant.imagePostV === "" && (
                            <div className="formStep">
                                <div className="separator" />
                                <h2>Les images</h2>
                                <div className="oneLabel">
                                    <p className="extentions">
                                        Extensions autorisées : <br />
                                        Images : png, jpeg, webp <br />
                                    </p>
                                    <label htmlFor="file">Fichiers</label>
                                    <input
                                        type="file"
                                        name="file"
                                        placeholder="Image"
                                        limit="5"
                                        size="5"
                                        accept="image/png, image/jpeg, image/webp"
                                        onChange={(e) => {
                                            onChangeFile(e);
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        <input type="submit" value="Modifier" className="primaryBouton" />
                        {error && <p className="error">Une erreur est survenue</p>}

                    </form>
                </div>

            )}
        </>
    );
};

export default UpdateOnePostVariant;