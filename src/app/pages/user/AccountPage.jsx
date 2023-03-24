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
        <div>
            {user && (
              <>
                <h1>{user.userName}</h1>
                <p>{user.email}</p>
              </>
            )}
            <div>
                Listes de mes post:
                <div>
                {posts?.map((post) => (
                    <div key={post.id}>
                        {post.author?.id === user.id && (
                          <Link to={`/${post?.id}`}>
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
    );
};

export default AccountPage;