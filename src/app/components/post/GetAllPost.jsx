import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../../setup/services/post.services";
import GetAllPostDesign from "./DesignPost";

const GetAllPostHome = () => {
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

    return (   
      <div className="allPostDesign">
        {posts?.map((post) => (
          <div key={post.id}>
            <Link to={`/${post?.id}`} className="link">
              <GetAllPostDesign post={post} />
            </Link>
          </div>
        ))}
        {posts?.length === 0 && (
          <div>
            Aucun résultat
          </div>
        )}
      </div>
    );
  };
  
  export default GetAllPostHome;