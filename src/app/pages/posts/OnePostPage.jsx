import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOnePost } from "../../../setup/services/post.services";

const OnePostPage = () => {
    const [post, setPost] = useState();
    const { id } = useParams();

    useEffect(()=>{
        getOnePost(id).then((post) => {
            setPost(post);
        });
    }, [id])

    return (
        <>
            {post && (
            <>
                <h1>{post.id}</h1>
                <p>{post.createdAt}</p>
                <p>{post.autor}</p>
            </>
            )}
        </>
    )
}

export default OnePostPage;