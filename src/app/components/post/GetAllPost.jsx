import { useEffect, useState } from "react";
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
            <div className='onePost'>
              <GetAllPostDesign post={post} />
            </div>
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