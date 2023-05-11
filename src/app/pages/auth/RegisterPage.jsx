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
          <Link to="/">
            <img src="./img/header/logo.png" className="logo" alt="logo de la marque" />
          </Link>
          <h1>Register</h1>
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
            <label>
                UserName:
                <input type="text" onChange={onChangeUser} value={user.userName} name="userName" className="inputForm" />
            </label>
            <input type="submit" value="Register" className="primaryBouton"/>
            <Link to="/auth/login">Login</Link>
        </form>
      </div>

    </>
    
    )       
};

export default RegisterPage;