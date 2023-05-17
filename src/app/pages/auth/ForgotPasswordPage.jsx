import { useState } from "react";
import { forgotPassword } from "../../../setup/services/auth.services";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState({ type: "", message: "" });

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email });
      setEmail("");
      setResult({ type: "success", message: "Le mail a été envoyé, vérifier votre boite mail" });
    } catch (error) {
      setResult({ type: "error", message: error.response.data.message });
    }
  };

  return (
    <div className="reset">
      <div className="reset__title">
        <h1>Forget password</h1>
      </div>

      <form onSubmit={onSubmitForm} className="formReset">   
        <div className="formResetUserInfos">
          <input type="email" name="email" value={email} placeholder="Email" className="inputForm" onChange={(e) => {onChangeEmail(e)}} required/>
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

export default ForgotPasswordPage;