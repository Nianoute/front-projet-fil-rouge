import * as React from "react";
import { Link } from "react-router-dom";
import {
  createPostLikeByUser,
  deletePostLikeByUser,
  getOnePostLikeByUser,
} from "../../../setup/services/like.service";
import { useContext } from "react";
import { UserContext } from "../../../setup/contexts/UserContext";
import { useState } from "react";
import { useEffect } from "react";

export default function GetAllPostDesign({ post }) {
  const { user } = useContext(UserContext);

  let promoPercent = 0;
  const promoPrice = post.promoPrice;
  const price = post.price;
  if (promoPrice !== 0 && price !== 0) {
    const promo = promoPrice * 100 / price;
    promoPercent = Math.round(promo);
    promoPercent = 100 - promoPercent;
  }

  //si post.description est trop long, on coupe le texte et on ajoute "..."
  let description = post.description;
  if (description.length > 100) {
    description = description.substring(0, 100) + "...";
  }
  post.description = description;


  const [postIsLiked, setPostIsLiked] = useState(false);

  useEffect(() => {
    if (user) {
      getOnePostLikeByUser(post.id).then((like) => {
        if (like) {
          setPostIsLiked(like);
        }
      }).catch((error) => {
        console.log(error);
        window.location.reload();
      });
    }
  }, [post.id, user]);

  const likePost = () => {
    if (user) {
      const data = {
        postLikes: post.id,
      };
      createPostLikeByUser(data).then((like) => {
        setPostIsLiked(like);
        post.likesPost.push(like);
      });
    }
  };

  const removeLikePost = () => {
    if (user && postIsLiked) {
      deletePostLikeByUser(postIsLiked.id).then(() => {
        setPostIsLiked(false);
        post.likesPost.pop();
      });
    }
  };

  return (
    <div className="post">
      <div className="postInfos">
        <Link to={`/${post?.id}`} className="link">
          <div className="postInfosPrimary">
            <div>
              {post.imagePost === "" && (
                <img src="logo.png" className="postLogo" alt="no" />
              )}
              {post.imagePost !== "" && (
                <img
                  src={post.imagePost}
                  className="postLogo"
                  alt="not found"
                />
              )}
            </div>
            <div className="postPrixTitle">
              <div className="postTitle">
                <h2>{post.title}</h2>
              </div>
              <p>{post.description}</p>
              <div className="postPrix">
                <p className="promoPrice">{post.promoPrice}€</p>
                <p className="price">{post.price}€</p>
                {promoPercent !== 0 && (
                  <p className="promoPercent">-{promoPercent}%</p>
                )}
              </div>
            </div>
          </div>


          <div className="separator" />
          <div className="postInfosTertiary">
            <div className="leftInfos">
              <div className="postAuthor">
                {post.author && (
                  <>
                    {post.author.avatar === "" ? (
                      <img
                        src="logo.png"
                        className="postAuthorAvatar"
                        alt="avatar"
                      />
                    ) : (
                      <img
                        src={post.author.avatar}
                        className="postAuthorAvatar"
                        alt="avatar"
                      />
                    )}
                    <p>{post.author.userName}</p>
                  </>
                )}
              </div>
              <div className="postBoutonComment">
                <div className="postBoutonCommentIcon">
                  <img src="comment.png" alt="avatar" />
                </div>
                <p>{post.comments?.length}</p>
              </div>
            </div>

            <div className="postDates">
              <div className="postDate">
                <p>Créé le: {new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
              {post.promoDuration && (
                <div className="postDate">
                  <p>Fin de promotion: {new Date(post.promoDuration).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div >

      <div className="postBoutonLike">
        {user && (
          <div className="like">
            {!postIsLiked ? (
              <div className="likeIcon cursor" onClick={likePost}>
                <img src="coeur-vide.png" alt="coeur_vide" />
              </div>
            ) : (
              <div className="likeIcon cursor" onClick={removeLikePost}>
                <img src="coeur-remplie.png" alt="coeur_remplie" />
              </div>
            )}
            <p>{post.likesPost?.length}</p>
          </div>
        )}
        {!user && (
          <div className="like">
            <div className="likeIcon">
              <img src="coeur-vide.png" alt="coeur_vide" />
            </div>
            <p>{post.likesPost?.length}</p>
          </div>
        )}
      </div>
    </div >
  );
}
