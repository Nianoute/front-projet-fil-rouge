import { useContext, useState } from "react";
import { createPostCommentByUser, getAllPostComments } from "../../../setup/services/comment.service";
import { UserContext } from "../../../setup/contexts/UserContext";

export default function GetAllCommentPost({ oneComment, post, setComments }) {
  const [commentChild, setCommentChild] = useState({
    description: "",
  });

  const onChangeCommentChild = (e) => {
    setCommentChild({ ...commentChild, [e.target.name]: e.target.value });
  };

  const { user } = useContext(UserContext);

  const [showFormCommentChild, setShowFormCommentChild] = useState(false);

  const [showCommentChild, setShowCommentChild] = useState(false);

  const [error, setError] = useState(false);

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
      })
    })
      .catch((err) => {
        console.log(err);
        setError(true);
        return;
      });

    setCommentChild({ ...commentChild, description: "" });
  };

  const showAndHideFormComment = (e) => {
    setShowFormCommentChild(!showFormCommentChild);
  };

  const showAndHideCommentChild = (e) => {
    setShowCommentChild(!showCommentChild);
  };


  return (
    <div className="separator">
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
        {user && (
          <p
            className="repondre"
            onClick={showAndHideFormComment}
            id={oneComment.id}
          >
            Répondre
          </p>
        )}
      </div>
      {showFormCommentChild && (
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
            {error && (
              <p className="error">
                Une erreur est survenue
              </p>
            )}
          </form>
        </div>
      )}
      {oneComment.children?.length > 0 && (
        <>
          <p
            className="showCommentChild"
            onClick={showAndHideCommentChild}
          >
            Voir les réponse(s) : {oneComment.children?.length}
          </p>
          {showCommentChild && (
            <div className="detailPostCommentsChildList">
              {oneComment.children?.map((child) => (
                <div
                  className="detailPostOneCommentsChild"
                  key={child.id}
                >
                  <div className="commentHeader">
                    {child.author.avatar === "" && (
                      <img
                        src="logo.png"
                        alt="avatar"
                        className="commentHeaderUserAvatar"
                      />
                    )}
                    {child.author.avatar !== "" && (
                      <img
                        src={child.author.avatar}
                        alt="avatar"
                        className="commentHeaderUserAvatar"
                      />
                    )}
                    <p className="commentHeaderUserName">
                      {child.author.userName}
                    </p>
                    <p className="commentHeaderDate">
                      {child.createdAt}
                    </p>
                  </div>
                  <div className="commentBody">
                    <p className="commentBodyDescription">
                      {child.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}