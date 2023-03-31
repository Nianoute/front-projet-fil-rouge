import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../../setup/services/post.services";
import GetAllPostDesign from "./DesignPost";

const GetAllPostHome = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState("");

  const handleCategories = (e) => {
    setCategories(e.target.value);
  };

  useEffect(() => {
    const filter = {
      categories
    };
    getAllPosts(filter)
      .then((posts) => {
        setPosts([...posts]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categories]);

    return (
      <>
          <div>
          <form>
              <label>
                  FilterByCat:
                  <input type="text" onChange={handleCategories} value={categories} name="categories" />
              </label>
          </form>
        </div>
        <div>
          {posts?.map((post) => (
            <div key={post.id}>
              <Link to={`/${post?.id}`}>
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
      </>
    );
  };
  
  export default GetAllPostHome;