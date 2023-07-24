import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../setup/services/auth.services";
import TokenService from "../../../setup/services/token.services";
import { useContext, useState } from "react";
import { UserContext } from "../../../setup/contexts/UserContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const onChangeUser = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await login(userLogin);
      TokenService.setTokenInLocalStorage(res.access_token);
      const userToken = TokenService.getUserInToken(res.access_token);
      console.log(userToken)
      setUser(userToken);
      console.log(user)
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="auth">
      <div className="auth__title">
        <h1>Connecte-toi</h1>
      </div>

      <form className="formAuth" onSubmit={onSubmitForm}>
        <div className="formAuthUserInfos">
          <input
            type="email"
            onChange={onChangeUser}
            value={userLogin.email}
            name="email"
            className="inputForm"
            placeholder="Ton adresse email"
          />
          <input
            type="password"
            onChange={onChangeUser}
            value={userLogin.password}
            name="password"
            className="inputForm"
            placeholder="Ton mot de passe"
          />
          <Link to="/auth/forgot-password">Mot de passe oublié ?</Link>
        </div>
        <input type="submit" value="Je me connecte" className="primaryBouton" />
        {error && <p className="error">Une erreur est survenue</p>}
      </form>

      <div className="auth__footer">
        <div className="auth__footer__separator">
          <div className="separator" />
          <p className="separatorText">OU</p>
          <div className="separator" />
        </div>
        <p>
          Pas encore de compte ? <Link to="/auth/register">Inscris-toi</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
