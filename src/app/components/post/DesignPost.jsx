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

  const [postIsLiked, setPostIsLiked] = useState(false);

  useEffect(() => {
    getOnePostLikeByUser(post.id).then((like) => {
      if (like) {
        setPostIsLiked(like);
      }
    });
  }, [post.id]);

  const likePost = () => {
    if (user) {
      const data = {
        postLikes: post.id,
      };
      createPostLikeByUser(data).then((like) => {
        console.log("like");
        setPostIsLiked(like);
        post.likesPost.push(like);
      });
    }
  };

  const removeLikePost = () => {
    if (user && postIsLiked) {
      deletePostLikeByUser(postIsLiked.id).then(() => {
        console.log("unlike");
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
            </div>
          </div>

          <div className="postInfosSecondary">
            <p>Description: {post.description}</p>
          </div>

          <div className="separator" />
          <div className="postInfosTertiary">
            <div className="postAuthor">
              {post.author ? (
                <>
                  {post.author.avatar === "" && (
                    <img
                      src="logo.png"
                      className="postAuthorAvatar"
                      alt="avatar"
                    />
                  )}
                  {post.author.avatar !== "" && (
                    <img
                      src={post.author.avatar}
                      className="postAuthorAvatar"
                      alt="avatar"
                    />
                  )}
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="postCategories">
              {post.categories ? (
                <>
                  {post.categories?.map((category) => {
                    return (
                      <p key={category.id} className="postCategory">
                        {category.name}
                      </p>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="postDates">
              <div className="postDate">
                <p>Créé le: {post.createdAt}</p>
              </div>
              <div className="postDate">
                <p>{post.promoDuration}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="postBouton">
        <div className="postBoutonLike">
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
          {!user && (
            <div className="like">
              <div className="likeIcon">
                <img src="coeur-vide.png" alt="coeur_vide" />
              </div>
            </div>
          )}
          <p>{post.likesPost?.length}</p>
        </div>

        <div className="postBoutonComment">
          <div className="postBoutonCommentIcon">
            <img src="comment.png" alt="avatar" />
          </div>
          <p>{post.comments?.length}</p>
        </div>

        <div className="postBoutonUrl">
          <Link to={post.webSite}>
            <div className="postBoutonUrlIcon">
              <img src="url.png" alt="avatar" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
