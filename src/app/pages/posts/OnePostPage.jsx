import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOnePost } from "../../../setup/services/post.services";

const OnePostPage = () => {
    const [post, setPost] = useState();
    const [postActive, setPostActive] = useState();
    const { id } = useParams();

    useEffect(()=>{
        getOnePost(id).then((post) => {
            setPost(post);
            setPostActive(post);
            console.log(post);
        });
    }, [id])


    return (
        <>
            {post && (
                <div className="onePostPage">
                    <div className="detailPostHeader">
                        <div className="detailPost">
                            <h1>{postActive.title}</h1>
                            <div className="detailPostInfosPrimary">
                                <div className="detailPostImage">
                                    <img src="logo192.png" alt={post.title} />
                                </div>
                                <div className="detailPostContent">
                                    <div className="postPrice">
                                        <p className="priceNow">{post.priceNow}</p>
                                        {post.price?
                                            <>
                                                <p className='priceInit'>{post.priceInit}</p>
                                            </>
                                            : <></>
                                        }
                                    </div>
                                    {post.webSite?
                                        <div className='postBoutonUrl'>
                                            <div className='postBoutonUrlIcon'>
                                                <Link to={post.webSite}>
                                                    <img src="url.png" alt='avatar' />
                                                </Link>
                                            </div>
                                        </div>
                                        : <></>
                                    }
                                </div>
                            </div>
                            <div className="detailPostInfosSecondary">
                                <div className="detailPostDescription">
                                    <p>{post.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="postVariants">
                            <div className="primaryPost">
                                <div className="primaryPostTitle">
                                    <p>{post.title}</p>
                                </div>
                                <div className="primaryPostImage">
                                    <img src={post.image} alt="not found" />
                                </div>
                                <div className="primaryPostPrice">
                                    <p>{post.price}</p>
                                    <p>{post.pricePromo}</p>
                                </div>
                                <div className="primaryPostDescription">
                                    <p>{post.description}</p>
                                </div>
                            </div>
                            {post.postVariants.map((variant) => (
                                <div className="secondaryPost" key={variant.id}>
                                    <div className="secondaryPostTitle">
                                        <p>{variant.title}</p>
                                    </div>
                                    <div className="secondaryPostImage">
                                        <img src={variant.image} alt="not found" />
                                    </div>
                                    <div className="secondaryPostPrice">
                                        <p>{variant.price}</p>
                                        <p>{variant.pricePromo}</p>
                                    </div>
                                    <div className="secondaryPostDescription">
                                        <p>{variant.description}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className="detailPostComments">
                        <p>Commentaires</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default OnePostPage;