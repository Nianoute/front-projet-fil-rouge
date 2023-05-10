import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavbarMain = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }
  }, []);

  return (
    <>
    <div className="navBar">
      <div className="navBar__left">
          <Link to="/">
            <img src="./img/header/logo.png" className="logo" alt="logo de la marque" />
          </Link>
      </div>

      <div className="navBar__center">
        <div className="searchBar">
          <input type="search" placeholder="Recherche" />
          <button><img src="./img/header/search.png" className="imgHeader" alt="search" /></button>
        </div>
      </div>

      <div className="navBar__right">
        {user && (
          <>
              <Link to="/newpost">
                  <img src="./img/header/post.png" className="icon" alt="post" />
              </Link>

              <Link to="/myaccount">
                <img src="./img/header/default_userlogo.jpg" className="icon" alt="default_userlogo" />
              </Link>
          </>

        )}

        {!user && (
          <>
              <Link to="/auth/login">
                <img src="./img/header/user.png" className="imgHeader" alt="user" />
              </Link>

            
              <Link to="/auth/register">
                Register
              </Link>
          </>

        )}
      </div>

    </div>
    </>
  );
};

export default NavbarMain;