import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../setup/services/auth.services";
import TokenService from "../../../setup/services/token.services";

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
        TokenService.setTokenInLocalStorage(res.access_token);
        const userToken = TokenService.getUserInToken(res.access_token);
        setUser(userToken)
        navigate("/")
      } catch (error) {
        console.log(error);
      }
    };

    return (
    <>
        <h1>
            Login
        </h1>
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
    </>
    )
}

export default LoginPage