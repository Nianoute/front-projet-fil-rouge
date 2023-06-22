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
                    <div className="detailPostInfosSecondary">
                        <div className="detailPostDescription">
                            <p>{post.description}</p>
                        </div>
                        <div className="detailPostComments">
                            <p>Commentaires</p>
                            {/* {post.comments.map((comment) => (
                                <div className="detailPostComment" key={comment.id}>
                                    <div className="detailPostCommentAvatar">
                                        {console.log(comment)}
                                        {comment.author?.avatar === "" && (
                                            <img src="logo.png" className='postAuthorAvatar' alt='avatar' />
                                        )}
                                        {comment.author?.avatar !== "" && (
                                            <img src={comment.author?.avatar} className='postAuthorAvatar' alt='avatar' />
                                        )}
                                    </div>
                                    <div className="detailPostCommentContent">
                                        <div className="detailPostCommentAuthor">
                                            <p>{comment.author.userName}</p>
                                        </div>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default OnePostPage;