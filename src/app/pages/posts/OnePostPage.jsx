import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOnePost } from "../../../setup/services/post.services";
import { UserContext } from "../../../setup/contexts/UserContext";
import {
  createPostLikeByUser,
  deletePostLikeByUser,
  getOnePostLikeByUser,
} from "../../../setup/services/like.service";

const OnePostPage = () => {
  const [post, setPost] = useState();
  const [postActive, setPostActive] = useState();
  const { id } = useParams();
  const [postIsLiked, setPostIsLiked] = useState(false);

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
        console.log("like");
        setPostIsLiked(like);
      });
    }
  };

  const removeLikePost = () => {
    if (user && postIsLiked) {
      deletePostLikeByUser(postIsLiked.id).then(() => {
        console.log("unlike");
        setPostIsLiked(false);
      });
    }
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
            <p>Commentaires</p>
          </div>
        </div>
      )}
    </>
  );
};

export default OnePostPage;
