import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
                <div className="detailPost">
                    <h1>{post.title}</h1>
                    <div className="detailPostInfosPrimary">
                        <div className="detailPostImage">
                            <img src="logo192.png" alt={post.title} />
                        </div>
                        <div className="detailPostContent">
                            <div className="postPrice">
                                <p className="priceNow">{post.priceNow}€</p>
                                {post.priceInit?
                                    <>
                                        <p className='priceInit'>{post.priceInit}€</p>
                                    </>
                                    : <></>
                                }
                            </div>

                            <div className='postBoutonUrl'>
                                <div className='postBoutonUrlIcon'>
                                    <Link to={post.webSite}>
                                        <img src="url.png" alt='avatar' />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default OnePostPage;