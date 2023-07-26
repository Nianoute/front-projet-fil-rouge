import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../setup/services/auth.services";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    userName: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(false);

  const [files, setFiles] = useState([]);

  const onChangeUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onChangeFile = (e) => {
    setFiles(e.target.files);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setError("password");
      return;
    }

    try {
      await register(user, files);
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      setError("erreur");
    }
  };

  return (
    <>
      <div className="auth">
        <div className="auth__title">
          <h1>Inscription</h1>
        </div>

        <form className="formAuth" onSubmit={onSubmitForm}>
          <div className="formAuthUserInfos">
            <input type="email" onChange={onChangeUser} value={user.email} name="email" className="inputForm" placeholder="Ton adresse email" />
            <input type="text" onChange={onChangeUser} value={user.userName} name="userName" className="inputForm" placeholder="Ton speudo" />
            <input type="password" onChange={onChangeUser} value={user.password} name="password" className="inputForm" placeholder="Ton mot de passe" />
            <input type="password" onChange={onChangeUser} value={user.confirmPassword} name="confirmPassword" className="inputForm" placeholder="Confirme ton mot de passe" />
            {error === "password" && <p className="error">Les mots de passe ne sont pas identiques</p>}
            <p className="extentions">
              Extensions autorisées : <br />
              Images : png, jpeg, webp <br />
            </p>
            <label htmlFor="file">Fichiers</label>
            <input type="file" name="file" placeholder="Image" limit="5" size="5" accept="image/png, image/jpeg, image/webp" onChange={(e) => { onChangeFile(e) }}
            />
          </div>
          <input type="submit" value="Je m'inscris" className="primaryBouton" />
          {error === "erreur" && <p className="error">Une erreur est survenue</p>}
        </form>

        <div className="auth__footer">
          <div className="auth__footer__separator">
            <div className="separator" />
            <p className="separatorText">OU</p>
            <div className="separator" />
          </div>
          <p>Déjà un compte ? <Link to="/auth/login">Connecte-toi</Link></p>
        </div>
      </div>

    </>

  )
};

export default RegisterPage;