import { useContext, useEffect, useState } from "react";
import { getAllPosts } from "../../../setup/services/post.services";
import GetAllPostDesign from "./DesignPost";
import { getAllCategories } from "../../../setup/services/category.service";
import { UserContext } from "../../../setup/contexts/UserContext";
import { slide as Menu } from 'react-burger-menu';
import { Link } from "react-router-dom";

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

  const [date, setDate] = useState("desc");

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
      </div>
      {filterActive && (
        <>
          <div className="filter_mobile">
            <form>
              <Menu customBurgerIcon={<img src="filter_icon.png" alt="" />}>
                <label>
                  Trouver un post :
                  <input type="text" onChange={handleTitle} value={title} name="title" className="selectOption" />
                </label>
                <label>
                  Filtrer par :
                  <select onChange={handleFilter} className="selectOption">
                    <option value="desc">Plus récent</option>
                    <option value="true">Tendances</option>
                    <option value="asc">Plus ancien</option>
                  </select>
                </label>
                {allCategories?.length !== 0 && (
                  <label>
                    Catégories :
                    <select name="categories" onChange={handleCategories} className="selectOption">
                      <option value="">--Aucun--</option>
                      {allCategories?.map((category) => (
                        <option value={category.name} key={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </label>
                )}
              </Menu>
            </form>
          </div>
          <div className="filter">
            <form>
              <label>
                Trouver un post :
                <input type="text" onChange={handleTitle} value={title} name="title" className="selectOption" />
              </label>
              <label>
                Filtrer par :
                <select onChange={handleFilter} className="selectOption">
                  <option value="desc">Plus récent</option>
                  <option value="true">Tendances</option>
                  <option value="asc">Plus ancien</option>
                </select>
              </label>
              {allCategories?.length !== 0 && (
                <label>
                  Catégories :
                  <select name="categories" onChange={handleCategories} className="selectOption">
                    <option value="">--Aucun--</option>
                    {allCategories?.map((category) => (
                      <option value={category.name} key={category.id}>{category.name}</option>
                    ))}
                  </select>
                </label>
              )}
            </form>
          </div>
        </>
      )}
      <div className="allPostDesign">
        {posts?.map((post) => (
          <div key={post.id}>
            <div className='onePost'>
              <GetAllPostDesign post={post} />
            </div>
          </div>
        ))}
        {posts?.length === 0 && (
          <div className="noPost">
            <Link to="/newpost">
              <div className="noPost_relative">
                <div className="noPost_message">
                  <div className="noPost_message_icon">
                    <img src="notFound.png" alt="notFoundImage" />
                  </div>
                  <h4>Aucun post ne correspond à votre recherche</h4>
                  <p>Créer le 1er post qui correspond à votre demande</p>
                  <button className="button">Créer un post</button>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default GetAllPostHome;