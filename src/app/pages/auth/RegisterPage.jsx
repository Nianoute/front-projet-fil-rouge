import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../setup/services/auth.services";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
      email: "",
      password: "",
      userName: "",
    });
  
    const onChangeUser = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    const onSubmitForm = async (e) => {
      e.preventDefault();
      try {
        await register(user);
        navigate("/auth/login");
      } catch (error) {
        console.log(error);
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
                <input type="email" onChange={onChangeUser} value={user.email} name="email" className="inputForm" placeholder="Ton adresse email"/>
                <input type="password" onChange={onChangeUser} value={user.password} name="password" className="inputForm" placeholder="Ton mot de passe"/>
                <input type="text" onChange={onChangeUser} value={user.userName} name="userName" className="inputForm" placeholder="Ton speudo"/>
          </div>
            <input type="submit" value="Je m'inscris" className="primaryBouton"/>
        </form>

        <div className="auth__footer">
          <div className="auth__footer__separator">
            <div className="separator"/>
            <p className="separatorText">OU</p>
            <div className="separator"/>
          </div>
          <p>Déjà un compte ? <Link to="/auth/login">Connecte-toi</Link></p>
        </div>
      </div>

    </>
    
    )       
};

export default RegisterPage;