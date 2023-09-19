import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GetAllPostDesign from "../../components/post/DesignPost";
import TokenService from "../../../setup/services/token.services";
import { getUserById } from "../../../setup/services/user.services";
import { UserContext } from "../../../setup/contexts/UserContext";
import { deletePost, getAllPostsByUser } from "../../../setup/services/post.services";

const AccountPage = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(null);
  const [me, setMe] = useState(null);
  const [posts, setPosts] = useState(null);

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserToken(decodedToken);
    }
  }, []);

  const disconnect = async (e) => {
    e.preventDefault();
    try {
      TokenService.removeTokenFromLocalStorage();
      setUserToken(null);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userToken) {
      getUserById(userToken.id).then((data) => {
        setMe(data);
        getAllPostsByUser(userToken.id).then((data) => {
          setPosts(data);
        });
      });
    }
  }, [userToken]);

  const handleDeletePost = (e) => {
    e.preventDefault();
    const postId = e.target.id;
    console.log(postId);
    deletePost(postId).then(() => {
      getAllPostsByUser(userToken.id).then((data) => {
        setPosts(data);
      });
    }
    );
  }

  return (
    <div className="myAccount">
      {me && (
        <div className="userInfos">
          <div className="userAvatar">
            {me.avatar === "" && <img src="logo.png" alt="avatar" />}
            {me.avatar !== "" && <img src={me.avatar} alt="avatar" />}
          </div>
          <div className="userInfosPrimary">
            <h1>{me.userName}</h1>
          </div>
          <div className="userInfosSecondary">
            <p>{me.email}</p>
          </div>

          <div className="userInfosEdit">
            <div className="deconnexionBouton" onClick={disconnect}>Déconnexion</div>
            <Link to="/myaccount-edit">
              <div className="primaryBouton">Modifier</div>
            </Link>
          </div>
        </div>
      )}

      <div className="userBlock">
        <div className="userStats">
          <div className="userStatsPrimary">
            <h2>Statistiques</h2>
          </div>
          <div className="userStatsSecondary">
            <p>Nombre de post: {me?.posts?.length}</p>
          </div>
        </div>

        <div className="userPosts">
          <h2>Listes de mes posts:</h2>
          {posts?.map((post) => (
            <div key={post.id} className="onePost">
              <GetAllPostDesign post={post} />
              <div className="action">
                <div className="deleteButton" id={post.id} onClick={handleDeletePost}>Supprimer</div>
                <div className="updatePost">
                  <Link to={`/editpost/${post.id}`}>
                    <div className="updateButton">Modifier</div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {me?.posts?.length === 0 && <div>Aucun résultat</div>}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
