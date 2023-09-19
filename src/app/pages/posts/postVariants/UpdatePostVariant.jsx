import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllPostVariantOfPostByParentId } from "../../../../setup/services/postVariant.services";
import CreatePostVariant from "./CreatePostVariant";
import UpdateOnePostVariant from "../../../components/post/postVariant/UpdateOnePostVariant";

const UpdatePostVariant = () => {
    const location = useLocation();
    const post = location.state.post
    const navigation = useNavigate();

    const [postVariants, setPostVariants] = useState()

    useEffect(() => {
        getAllPostVariantOfPostByParentId(post.id).then((postAllVariants) => {
            setPostVariants(postAllVariants);
        });
    }, [post])

    return (
        <div className="createPostVariant">
            {postVariants?.length === 0 ? (
                <CreatePostVariant></CreatePostVariant>
            ) : (
                <>
                    {postVariants?.map((onePostVariant) => (
                        <div key={onePostVariant.id}>
                            <UpdateOnePostVariant onePostVariant={onePostVariant}>
                            </UpdateOnePostVariant>
                        </div>
                    ))}
                    <div className="auth__footer__separator">
                        <div className="separator" />
                        <p className="separatorText">OU</p>
                        <div className="separator" />
                    </div>
                    <CreatePostVariant></CreatePostVariant>


                    <button onClick={() => navigation(`/editpost/${post.id}`)} className="retour secondaryBouton">Retour</button>
                    <button onClick={() => navigation(`/`)} className="terminer terciaryBouton">Terminer</button>
                </>
            )}
        </div>

    );
};

export default UpdatePostVariant;