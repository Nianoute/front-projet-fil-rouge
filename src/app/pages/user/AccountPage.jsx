import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GetAllPostDesign from '../../components/post/DesignPost';
import TokenService from '../../../setup/services/token.services';
import { getUserById } from '../../../setup/services/user.services';

const AccountPage = ({user, setUser}) => {
    const navigate = useNavigate();
    const [userToken, setUserToken] = useState(null);
    const [me, setMe] = useState(null);

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
      if (userToken){
        getUserById(userToken.id).then((data) => {
          setMe(data);
        });
      }
    }, [userToken]);

    return (
        <div className='myAccount'>
            {userToken && (
              <div className='userInfos'>
                <div className='userAvatar'>
                  {userToken.avatar === "" && (
                    <img src="logo.png" alt='avatar' />
                  )}
                  {userToken.avatar !== "" && (
                    <img src={userToken.avatar} alt='avatar' />
                  )}
                </div>
                <div className='userInfosPrimary'>
                  <h1>{userToken.userName}</h1>
                </div>
                <div className='userInfosSecondary'>
                  <p>{userToken.email}</p>
                </div>
                <div className='userInfosEdit'>
                  <Link to='/myaccount-edit'>
                    <div className="primaryBouton">Modifier</div>
                  </Link>
                </div>
              </div>
            )}

            <div className='userBlock'>
              <div className='userStats'>
                  <div className='userStatsPrimary'>
                    <h2>Statistiques</h2>
                  </div>
                  <div className='userStatsSecondary'>
                    <p>Nombre de post: {me?.posts?.length}</p>
                    <p onClick={disconnect}>Déconnexion</p>
                  </div>
              </div>

              <div className='userPosts'>
                  <h2>Listes de mes posts:</h2>
                      {me?.posts?.map((post) => (
                        <div key={post.id} className='onePost'>
                              <div className='updatePost'>
                                <Link to={`/editpost/${post.id}`}>
                                  <div className='updateButton'>Modifier</div>
                                </Link>
                              </div>
                              <GetAllPostDesign post={post} />
                        </div>
                      ))}
                      {me?.posts?.length === 0 && (
                        <div>
                            Aucun résultat
                        </div>
                      )}
              </div>
            </div>
        </div>
    );
};

export default AccountPage;