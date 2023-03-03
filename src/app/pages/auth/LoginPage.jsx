import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../setup/services/auth.services";

const LoginPage = () => {
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
        const res = await login(user);
        localStorage.setItem("token", res.access_token);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };

    return (
    <form onSubmit={onSubmitForm}>
        <label>
            email:
            <input type="email" onChange={onChangeUser} value={user.email} name="email" />
        </label>
        <label>
            Mdp:
            <input type="password" onChange={onChangeUser} value={user.password} name="password" />
        </label>
        <label>
            UserName:
            <input type="text" onChange={onChangeUser} value={user.userName} name="userName" />
        </label>
        <input type="submit" value="Submit" />
    </form>
    )
}

export default LoginPage