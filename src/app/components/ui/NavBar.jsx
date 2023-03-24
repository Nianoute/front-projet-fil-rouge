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
    <ul>
      <li>   
        <Link to="/">
          Home
        </Link>
      </li>

      {user && (
        <>
          <li>
            <Link to="/myaccount">
              Je suis {user.userName}
            </Link>
          </li>
          <li>
            <Link to="/newpost">
              Créer un post
            </Link>
          </li>
        </>

      )}

      {!user && (
        <>
          <li> 
            <Link to="/auth/login">
              Login
            </Link>
          </li>

          <li>
           <Link to="/auth/register">
              Register
            </Link>
          </li>
        </>

      )}

    </ul>
    </>
  );
};

export default NavbarMain;