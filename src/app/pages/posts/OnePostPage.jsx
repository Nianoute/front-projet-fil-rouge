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
import GetAllCommentPost from "../../components/comment/GetAllCommentPost";

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

  const [error, setError] = useState(false);

  const { user } = useContext(UserContext);

  const [promoPercent, setPromoPercent] = useState(0);

  useEffect(() => {
    getOnePost(id).then((post) => {
      setPost(post);
      setPostActive(post);
      if (post.promoPrice !== 0 && post.price !== 0) {
        let promo = post.promoPrice * 100 / post.price;
        promo = Math.round(promo);
        promo = 100 - promo;
        setPromoPercent(promo);
      }

      if (user) {
        getOnePostLikeByUser(post.id).then((like) => {
          if (like) {
            setPostIsLiked(like);
          }
        });
      }
      getAllPostComments(post.id).then((allComments) => {
        setComments(allComments);
      });
    });

  }, [id, user]);

  useEffect(() => {
    if (postActive) {
      if (postActive.promoPrice !== 0 && postActive.price !== 0) {
        let promo = postActive.promoPrice * 100 / postActive.price;
        promo = Math.round(promo);
        promo = 100 - promo;
        setPromoPercent(promo);
      } else {
        setPromoPercent(0);
      }
    }
  }, [postActive]);

  const changePostActifToVariant = (e) => {
    const indexOfVariant = e.target.id;
    setPostActive(post.postVariants[indexOfVariant]);
    if (post.postVariants[indexOfVariant].imagePostV === "") {
      setPostActive({
        ...post.postVariants[indexOfVariant],
        imagePost: post.imagePost,
      });
    } else {
      setPostActive({
        ...post.postVariants[indexOfVariant],
        imagePost: post.postVariants[indexOfVariant].imagePostV,
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
    })
      .catch((err) => {
        console.log(err);
        setError(true);
        return;
      });

    setComment({
      name: "",
      description: "",
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
                  {postActive.imagePost !== "" ? (
                    <img src={postActive.imagePost} alt="not found" />
                  ) : (
                    <img src="/notFoundImage.png" alt="not found" />
                  )}
                </div>
                <div className="detailPostContent">
                  <div className="postPrice">
                    {postActive.promoPrice !== 0 && postActive.price !== 0 ? (
                      <div className="postPricePromo">
                        <p className="promoPrice">{postActive.promoPrice}€</p>
                        <p className="price">{postActive.price}€</p>
                      </div>
                    ) : (
                      <div className="postPricePromo">
                        <p className="">La publication n'est pas une promotion sur un prix</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="detailPostInfosSecondary">
                <div className="detailPostSecondary">
                  <h3>Site Web :</h3>
                  {post.website ? (
                    <div className="postBoutonUrl">
                      <Link to={post.website}>
                        <div className="postBoutonUrlIcon">
                          <img src="url.png" alt="avatar" />
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <p className="description">Cette publication ne possède pas de lien pour la promotion</p>
                  )}
                </div>
                <div className="detailPostSecondary">
                  <h3>Description :</h3>
                  {postActive.description === "" ? (
                    <p className="description">Cette publication ne possède pas de description</p>
                  ) : (
                    <p className="description">{postActive.description}</p>
                  )}
                </div>

                <div className="detailPostSecondary">
                  <h3>Categories :</h3>
                  {post.categories.length === 0 ? (
                    <p className="description">Cette publication ne possède pas de catégorie</p>
                  ) : (
                    <div className="categories">
                      {post.categories.map((category) => (
                        <div className="category" key={category.id}>
                          <p>{category.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="detailPostAuthor">
                <p className="author">Par {post.author.userName}</p>
                {post.author.avatar !== "" ? (
                  <img src={post.author.avatar} alt="avatar" className="postAuthorAvatar" />
                ) : (
                  <img src="/logo.png" alt="avatar" className="postAuthorAvatar" />
                )}
              </div>

              <div className="detailPostDate">
                <p>Crée le: {new Date(post.createdAt).toLocaleDateString()}</p>
                {post.promoDuration && (
                  <p className="promoDuration">
                    Promotion jusqu'au:{" "}
                    {new Date(post.promoDuration).toLocaleDateString()}
                    <img src="/temps.png" alt="temps" />
                  </p>
                )}
              </div>

              {user ? (
                <div className="like">
                  {!postIsLiked ? (
                    <div className="likeIcon cursor" onClick={likePost}>
                      <img src="coeur-vide.png" alt="coeur_vide" />
                      <p>{post.likesPost?.length}</p>
                    </div>
                  ) : (
                    <div className="likeIcon cursor" onClick={removeLikePost}>
                      <img src="coeur-remplie.png" alt="coeur_remplie" />
                      <p>{post.likesPost?.length}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="like">
                  <div className="likeIcon">
                    <img src="coeur-vide.png" alt="coeur_vide" />
                    <p>{post.likesPost?.length}</p>
                  </div>
                </div>
              )}

              {promoPercent && promoPercent !== 0 && (
                <div className="promoPercent">
                  <p className="text">-{promoPercent}%</p>
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
                    {post.imagePost !== "" ? (
                      <img src={post.imagePost} alt="post parent" />
                    ) : (
                      <img src="/logo.png" alt="notFound" />
                    )}
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
                        <img src="/logo.png" alt="not found" id={index} />
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
            {user ? (
              <div className="postCommentsForm heightComment">
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
                  {error && <p className="error">Une erreur est survenue</p>}
                </form>
              </div>
            ) : (
              <Link to="/auth/login" className="connexion">
                <h2>Commentaires</h2>
                <div className="connexionMessage">
                  <p>Vous devez être connecté pour commenter</p>
                  <div className="primaryBouton">Se connecter</div>
                </div>
              </Link>
            )}

            {comments && (
              <div className="detailPostCommentsList">
                <h2>Listes de Commentaires</h2>
                {comments.length === 0 && (
                  <div className="notFound">
                    <img src="notFoundComment.png" alt="not found" />
                    <h3>Aucun commentaire trouvé</h3>
                    <p>Soyez le premier à commenter !</p>
                  </div>
                )}
                {comments?.map((oneComment) => (
                  <div className="detailPostOneComment" key={oneComment.id}>
                    {oneComment.parent === null && (
                      <>
                        <GetAllCommentPost oneComment={oneComment} post={post} setComments={setComments} />
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OnePostPage;
