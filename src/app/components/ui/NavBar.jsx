import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../setup/contexts/UserContext";
import jwtDecode from "jwt-decode";

const NavbarMain = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }
  }, [setUser]);

  console.log(user);

  return (
    <>
      <div className="navBar">
        <div className="navBar__left">
          <Link to="/">
            <img src="/logo.png" className="logo" alt="logo de la marque" />
          </Link>
        </div>

        <div className="navBar__center">
          <div className="searchBar"></div>
        </div>

        <div className="navBar__right">
          {user && (
            <>
              <Link to="/newpost">
                <img src="/post.png" className="icon" alt="post" />
              </Link>

              <Link to="/myaccount">
                <img
                  src="/default_userlogo.jpg"
                  className="icon"
                  alt="default_userlogo"
                />
              </Link>
            </>
          )}

          {!user && (
            <>
              <Link to="/auth/login">
                <img src="/user.png" className="imgHeader" alt="user" />
              </Link>

              <Link to="/auth/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarMain;
