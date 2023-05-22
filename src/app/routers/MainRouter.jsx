import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"
import HomePage from "../pages/HomePage"
import CreateNewPost from "../pages/posts/CreateNewPostPage"
import OnePostPage from "../pages/posts/OnePostPage"
import AccountPage from "../pages/user/AccountPage"
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage"
import ResetPasswordPage from "../pages/auth/ResetPasswordPage"
import EditUserPage from "../pages/user/EditUserPage"
import UpdatePostPage from "../pages/posts/UpdatePostPage"


const MainRouter = ({user, setUser}) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="*" element={<h1>404</h1>} />

                <Route path="/:id" element={<OnePostPage/>} />
                <Route path="/newpost" element={<CreateNewPost />} />
                <Route path="/editpost/:id" element={<UpdatePostPage />} />

                <Route path="/myaccount" element={<AccountPage />} />
                <Route path="/myaccount-edit" element={<EditUserPage />} />

                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/auth/login" element={<LoginPage user={user} setUser={setUser}/>} />
                <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/auth/reset-password/:token" element={<ResetPasswordPage />} />
            </Routes>
        </>
    )
}

export default MainRouter