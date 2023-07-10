import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOnePost } from "../../../setup/services/post.services";
import { UserContext } from "../../../setup/contexts/UserContext";
import {
  createPostLikeByUser,
  deletePostLikeByUser,
  getOnePostLikeByUser,
} from "../../../setup/services/like.service";
import {
  createPostCommentByUser,
  getAllPostComments,
} from "../../../setup/services/comment.service";

const OnePostPage = () => {
  const [post, setPost] = useState();
  const [postActive, setPostActive] = useState();
  const { id } = useParams();
  const [postIsLiked, setPostIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    name: "",
    description: "",
  });
  const [commentChild, setCommentChild] = useState({
    description: "",
  });

  const { user } = useContext(UserContext);

  useEffect(() => {
    getOnePost(id).then((post) => {
      setPost(post);
      setPostActive(post);
      getOnePostLikeByUser(post.id).then((like) => {
        if (like) {
          setPostIsLiked(like);
        }
      });
      getAllPostComments(post.id).then((allComments) => {
        setComments(allComments);
      });
    });
  }, [id]);

  const changePostActifToVariant = (e) => {
    const indexOfVariant = e.target.id;
    setPostActive(post.postVariants[indexOfVariant]);
    if (post.postVariants[indexOfVariant].imagePostV === "") {
      setPostActive({
        ...post.postVariants[indexOfVariant],
        imagePostV: post.imagePost,
      });
    }
  };

  const changePostActifToPrimary = () => {
    setPostActive(post);
  };

  const likePost = () => {
    if (user) {
      const data = {
        postLikes: post.id,
      };
      createPostLikeByUser(data).then((like) => {
        setPostIsLiked(like);
      });
    }
  };

  const removeLikePost = () => {
    if (user && postIsLiked) {
      deletePostLikeByUser(postIsLiked.id).then(() => {
        setPostIsLiked(false);
      });
    }
  };

  const onChangeComment = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const onChangeCommentChild = (e) => {
    setCommentChild({ ...commentChild, [e.target.name]: e.target.value });
  };

  const handleCreateComment = (e) => {
    e.preventDefault();
    const data = {
      name: comment.name,
      description: comment.description,
      post: post.id,
    };

    createPostCommentByUser(data).then(() => {
      getAllPostComments(post.id).then((allComments) => {
        setComments(allComments);
      });
    });

    setComment({
      name: "",
      description: "",
    });
  };

  const showFormCommentChidl = (e) => {
    const id = e.target.id;
    const forms = document.querySelectorAll(".formChild");
    const form = document.querySelector(`.formChild${id}`);
    forms.forEach((oneForm) => {
      if (oneForm !== form) {
        oneForm.style.display = "none";
      }
    });

    if (form.style.display === "flex") {
      form.style.display = "none";
    } else {
      form.style.display = "flex";
    }
    setCommentChild({
      description: "",
    });
  };

  const handleCreateCommentChild = (e) => {
    e.preventDefault();
    const data = {
      name: "",
      description: commentChild.description,
      post: post.id,
      parent: e.target.id,
    };
    createPostCommentByUser(data).then(() => {
      getAllPostComments(post.id).then((allComments) => {
        setComments(allComments);
      });
    });
  };

  return (
    <>
      {post && (
        <div className="onePostPage">
          <div className="detailPostHeader">
            <div className="detailPost">
              <h1>{postActive.title}</h1>
              <div className="detailPostInfosPrimary">
                <div className="detailPostImage">
                  {postActive.imagePost && (
                    <img src={postActive.imagePost} alt="not found" />
                  )}
                  {postActive.imagePostV && (
                    <img src={postActive.imagePostV} alt="not found" />
                  )}
                </div>
                <div className="detailPostContent">
                  <div className="postPrice">
                    <p className="priceNow">{postActive.priceNow}</p>
                    {postActive.price ? (
                      <>
                        <p className="priceInit">{postActive.priceInit}</p>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  {post.webSite ? (
                    <div className="postBoutonUrl">
                      <div className="postBoutonUrlIcon">
                        <Link to={post.webSite}>
                          <img src="url.png" alt="avatar" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="detailPostInfosSecondary">
                <div className="detailPostDescription">
                  <p>{postActive.description}</p>
                </div>
              </div>

              {user && (
                <div className="like">
                  {!postIsLiked ? (
                    <div className="likeIcon" onClick={likePost}>
                      <img src="coeur-vide.png" alt="coeur_vide" />
                    </div>
                  ) : (
                    <div className="likeIcon" onClick={removeLikePost}>
                      <img src="coeur-remplie.png" alt="coeur_remplie" />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="postVariants">
              <div className="primaryPost" onClick={changePostActifToPrimary}>
                <div className="primaryPostTitle">
                  <h3>{post.title}</h3>
                </div>
                <div className="primaryPostInfos">
                  <div className="primaryPostImage">
                    <img src={post.imagePost} alt="not found" />
                  </div>
                  <div className="primaryPostPrice">
                    <p className="promoPrice">{post.promoPrice}€</p>
                    <p className="price">{post.price}€</p>
                  </div>
                </div>
                <div className="onClickPost">
                  <div className="onClickPostDiv" />
                </div>
              </div>

              {post.postVariants.map((variant, index) => (
                <div
                  className="secondaryPost"
                  key={variant.id}
                  id={index}
                  onClick={changePostActifToVariant}
                >
                  <div className="secondaryPostTitle" id={index}>
                    <h3 id={index}>{variant.title}</h3>
                  </div>
                  <div className="secondaryPostInfos" id={index}>
                    <div className="secondaryPostImage" id={index}>
                      {variant.imagePostV === "" ? (
                        <img src={post.imagePost} alt="not found" id={index} />
                      ) : (
                        <img
                          src={variant.imagePostV}
                          alt="not found"
                          id={index}
                        />
                      )}
                    </div>
                    <div className="secondaryPostPrice" id={index}>
                      <p className="promoPrice" id={index}>
                        {variant.promoPrice}€
                      </p>
                      <p className="price" id={index}>
                        {variant.price}€
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="detailPostComments">
            <div className="postCommentsForm">
              <h2>Commentaires</h2>
              <form onSubmit={handleCreateComment} className="form">
                <input
                  type="text"
                  placeholder="Nom"
                  name="name"
                  onChange={onChangeComment}
                  value={comment.name}
                  className="commentTitle"
                />
                <textarea
                  name="description"
                  minLength="1"
                  maxLength="144"
                  rows="10"
                  placeholder="Commentaire"
                  onChange={onChangeComment}
                  value={comment.description}
                  className="commentDescription"
                ></textarea>
                <input type="submit" className="submit" />
              </form>
            </div>

            {comments ? (
              <div className="detailPostCommentsList">
                <h2>Listes de Commentaires</h2>
                {comments?.map((oneComment) => (
                  <div className="detailPostOneComment" key={oneComment.id}>
                    {oneComment.parent === null ? (
                      <>
                        <div className="commentHeader">
                          {oneComment.author.avatar === "" && (
                            <img
                              src="logo.png"
                              alt="avatar"
                              className="commentHeaderUserAvatar"
                            />
                          )}
                          {oneComment.author.avatar !== "" && (
                            <img
                              src={oneComment.author.avatar}
                              alt="avatar"
                              className="commentHeaderUserAvatar"
                            />
                          )}
                          <p className="commentHeaderUserName">
                            {oneComment.author.userName}
                          </p>
                          <p className="commentHeaderDate">
                            {oneComment.createdAt}
                          </p>
                        </div>
                        <div className="commentBody">
                          <p className="commentBodyName">{oneComment.name}</p>
                          <p className="commentBodyDescription">
                            {oneComment.description}
                          </p>
                          <p
                            className="repondre"
                            onClick={showFormCommentChidl}
                            id={oneComment.id}
                          >
                            Répondre
                          </p>
                        </div>
                        <div className="detailPostCommentsChildForm">
                          <form
                            onSubmit={handleCreateCommentChild}
                            id={oneComment.id}
                            className={`formChild formChild${oneComment.id}`}
                          >
                            <textarea
                              name="description"
                              minLength="1"
                              maxLength="144"
                              rows="5"
                              placeholder="Commentaire"
                              onChange={onChangeCommentChild}
                              value={commentChild.description}
                              className="commentDescription"
                            ></textarea>
                            <input type="submit" className="submit" />
                          </form>
                        </div>
                        {oneComment.children?.length > 0 && (
                          <div className="detailPostCommentsChildList">
                            {oneComment.children?.map((child) => (
                              <div
                                className="detailPostOneCommentsChild"
                                key={child.id}
                              >
                                <p>{child.description}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OnePostPage;
