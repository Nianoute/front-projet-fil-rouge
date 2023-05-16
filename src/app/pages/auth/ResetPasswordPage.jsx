import { useState } from "react";
import { resetPassword } from "../../../setup/services/auth.services";
import { Link, useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState({});
  const [result, setResult] = useState({ type: "", message: "" });

  const onChangePassword = (e) => {
    const {name, value} = e.target;
    setPassword({
        ...password,
        [name]: value
    })
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    
    try {
      if(password.password === password.cpassword) {
        await resetPassword(token, { password: password.password });
        setPassword("");
        setResult({
          type: "success",
          message: "Votre mot de passe a été modifié",
        });
      } else {
        setResult({
          type: "error",
          message: "Les mots de passe ne correspondent pas",
        });
      }
    } catch (error) {
      setResult({ type: "error", message: error.response.data.message });
    }
  };
  
  return (
    <div className="reset">
      <div className="reset__title">
        <h1>Reset password</h1>
      </div>

      <form onSubmit={onSubmitForm} className="formReset">
        <div className="formResetUserInfos">
          <input label="Password" type="password" name="password" placeholder="Password" className="inputForm" onChange={(e) => {onChangePassword(e)}}/>
          <input label="Confirm password" type="password" name="cpassword" placeholder="Confirm password" className="inputForm" onChange={(e) => {onChangePassword(e)}}/>
        </div>
        {result.type === "success" && (
          <p>
            {result.message}
          </p>
        )}
        {result.type === "error" && (
          <p>
            {result.message}
          </p>
        )}
        <button type="submit" className="primaryBouton">Confirm</button>
      </form>

      <div className="reset__footer">
        <div className="reset__footer__separator">
          <div className="separator"/>
          <p className="separatorText">OU</p>
          <div className="separator"/>
        </div>
        <p>Retour à la <Link to="/auth/login">Connexion</Link></p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;