import { useContext, useEffect, useState } from "react";
import { getAllPosts } from "../../../setup/services/post.services";
import GetAllPostDesign from "./DesignPost";
import { getAllCategories } from "../../../setup/services/category.service";
import { UserContext } from "../../../setup/contexts/UserContext";

const GetAllPostHome = () => {
  const [posts, setPosts] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const [categories, setCategories] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [title, setTitle] = useState("");

  const { user } = useContext(UserContext);

  const handleCategories = (e) => {
    setCategories(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const [like, setLike] = useState("");

  const [date, setDate] = useState("");

  const handleFilter = (e) => {
    if (e.target.value === "true") {
      setLike("like");
      setDate("");
    }
    if (e.target.value === "asc") {
      setDate("asc");
      setLike("");
    }
    if (e.target.value === "desc") {
      setDate("desc");
      setLike("");
    }
  };

  useEffect(() => {
    const filter = { categories, title, like, date };

    getAllPosts(filter)
      .then((posts) => {
        setPosts([...posts]);
        if (posts.length !== 0) {
          setFilterActive(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categories, title, like, user, date]);

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
        {filterActive && (
          <div className="filter">
            <form>
              <label>
                FilterByTitle:
                <input type="text" onChange={handleTitle} value={title} name="title" />
              </label>
              <select onChange={handleFilter}>
                <option value="desc">Plus récent</option>
                <option value="true">Tendances</option>
                <option value="asc">Plus ancien</option>
              </select>
              {allCategories?.length !== 0 && (
                <select name="categories" onChange={handleCategories} className="selectOption">
                  <option value="">Categorie</option>
                  {allCategories?.map((category) => (
                    <option value={category.name} key={category.id}>{category.name}</option>
                  ))}
                </select>
              )}
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