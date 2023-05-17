import { useEffect, useState } from "react";
import { getAllPosts } from "../../../setup/services/post.services";
import GetAllPostDesign from "./DesignPost";
import { getAllCategories } from "../../../setup/services/category.service";

const GetAllPostHome = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [title, setTitle] = useState("");



  const handleCategories = (e) => {
    setCategories(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    const filter = {categories, title};
    getAllPosts(filter)
      .then((posts) => {
        setPosts([...posts]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categories, title]);

  useEffect(() => {
    getAllCategories()
      .then((allCategories) => {
        setAllCategories([...allCategories]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

    return (
    <div className="home">
      <div className="layout">
        <div className="layout__title">
          <h1>Listes des posts</h1>
        </div>
        {allCategories?.length !== 0 && (
          <div className="filter">
            <form>
                <label>
                  FilterByTitle:
                  <input type="text" onChange={handleTitle} value={title} name="title" />
                </label>
                <select name="categories" onChange={handleCategories} className="selectOption">
                    <option value="">Categorie</option>
                    {allCategories?.map((category) => (
                        <option value={category.name} key={category.id}>{category.name}</option>
                    ))}
                </select>
            </form>
          </div>        
        )}
      </div>
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

    </div>
    );
  };
  
  export default GetAllPostHome;