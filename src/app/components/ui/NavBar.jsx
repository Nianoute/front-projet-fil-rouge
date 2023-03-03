import { Link } from "react-router-dom";

const NavbarMain = () => {
  return (
    <>
    <ul>
      <li>   
      <Link to="/">
        Home
      </Link>
      </li>

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

      <li>
      <Link to="/newpost">
        Créer un post
      </Link>
      </li>

    </ul>
    </>
  );
};

export default NavbarMain;