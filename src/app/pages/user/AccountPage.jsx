import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../../../setup/services/post.services';
import GetAllPostDesign from '../../components/post/DesignPost';

const AccountPage = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      getAllPosts()
        .then((posts) => {
          setPosts([...posts]);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      }
    }, []);

    return (
        <div className='myAccount'>
            {user && (
              <div className='userInfos'>
                <div className='userAvatar'>
                  <img src=".img/account/default_userlogo.jpg" alt='avatar' />
                </div>
                <div className='userInfosPrimary'>
                  <h1>{user.userName}</h1>
                </div>
                <div className='userInfosSecondary'>
                  <p>{user.email}</p>
                </div>
                <div className='userInfosEdit'>
                  <Link to='/account/edit' className='primaryBouton'>
                    <div className="divBouton">Modifier</div>
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
                    <p>Nombre de post: {posts?.length}</p>
                  </div>
              </div>

              <div className='userPosts'>
                  <h2>Listes de mes posts:</h2>
                  <div className='onePost'>
                    {posts?.map((post) => (
                      <div key={post.id}>
                          {post.author?.id === user.id && (
                            <Link to={`/${post?.id}`} className='link'>
                              <GetAllPostDesign post={post} />
                            </Link>
                          )}
                      </div>
                    ))}
                    {posts?.length === 0 && (
                      <div>
                          Aucun résultat
                      </div>
                    )}
                  </div>
              </div>
            </div>

        </div>
    );
};

export default AccountPage;