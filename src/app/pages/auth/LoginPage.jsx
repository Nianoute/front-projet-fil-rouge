import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../setup/services/auth.services";
import TokenService from "../../../setup/services/token.services";

const LoginPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
      email: "",
      password: ""
    });
  
    const onChangeUser = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    const onSubmitForm = async (e) => {
      e.preventDefault();
      try {
        const res = await login(user);
        TokenService.setTokenInLocalStorage(res.access_token);
        const userToken = TokenService.getUserInToken(res.access_token);
        setUser(userToken)
        navigate("/")
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div className="auth">
        <div className="auth__title">
          <Link to="/">
            <img src="logo.png" className="logo" alt="logo de la marque" />
          </Link>
          <h1>Login</h1>
        </div>

        <form className="formAuth" onSubmit={onSubmitForm}>
            <label>
                Email:
                <input type="email" onChange={onChangeUser} value={user.email} name="email" className="inputForm" />
            </label>
            <label>
                Mdp:
                <input type="password" onChange={onChangeUser} value={user.password} name="password" className="inputForm" />
            </label>
            <input type="submit" value="Login" className="primaryBouton"/>
            <Link to="/auth/register">Register</Link>
        </form>
      </div>
    )
}

export default LoginPage