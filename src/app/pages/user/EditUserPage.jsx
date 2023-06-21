import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateFileUser, updateUser } from "../../../setup/services/user.services";

const EditUserPage = () => {
    const navigate = useNavigate();
    const [userToken, setUserToken] = useState(null);
    
        const [user, setUser] = useState({
                userName: "",
                password: ""
            });

    useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
        const decodedToken = jwtDecode(token);
        setUserToken(decodedToken);
    }
    }, []);

    
    const onChangeUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user);
    };
    
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem("access_token");
            await updateUser(userToken.id, user);
            navigate("/myaccount");
        } catch (error) {
            console.log(error);
        }
    };

    const [files, setFiles] = useState(null);

    const onChangeFile = (e) => {
        setFiles(e.target.files)
    };

    const onSubmitFile = async (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem("access_token");
            await updateFileUser(userToken.id, files);
            navigate("/myaccount");
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <>
        {userToken && (
            <div className="auth">
                <div className="auth__title">
                <h1>Edit</h1>
                </div>

                <form className="formAuth" onSubmit={onSubmitForm}>
                    <div className="formAuthUserInfos">
                        <input type="email" value={userToken.email} name="email" className="inputForm" placeholder="Ton adresse email" readOnly/>
                        <input type="text" onChange={onChangeUser} value={user.userName} name="userName" className="inputForm" placeholder="Ton speudo"/>
                        <input type="password" onChange={onChangeUser} value={user.password} name="password" className="inputForm" placeholder="password"/>
                    </div>
                    <input type="submit" value="Je modifie mon compte" className="primaryBouton"/>
                </form>

                <div className="auth__footer">
                <div className="auth__footer__separator">
                    <div className="separator"/>
                    <p className="separatorText">OU</p>
                    <div className="separator"/>
                </div>

                <form className="formAuth" onSubmit={onSubmitFile}>
                    <div className="formAuthUserInfos">
                        <input type="file" name="file" placeholder="Image" limit="5" size="5" accept="image/png, image/jpeg" onChange={(e) => { onChangeFile(e) }}/>
                    </div>
                    <input type="submit" value="Je modifie mon avatar" className="primaryBouton"/>
                </form>

                <div className="auth__footer__separator">
                    <div className="separator"/>
                    <p className="separatorText">OU</p>
                    <div className="separator"/>
                </div>
                <p><Link to="/myaccount">Annuler</Link></p>
            </div>
            </div>
        )}
    </>
  );
};

export default EditUserPage;