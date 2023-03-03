import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOnePost } from "../../../setup/services/post.services";

const OnePostPage = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(()=>{
        getOnePost(id).then((post) => {
            setPost(post)
            console.log(post)
        });
    }, [id])

    return (
        <>
            <h1>{id}</h1>
        </>
    )
}

export default OnePostPage;