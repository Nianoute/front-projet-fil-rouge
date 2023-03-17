import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"
import HomePage from "../pages/HomePage"
import CreateNewPost from "../pages/posts/CreateNewPostPage"
import OnePostPage from "../pages/posts/OnePostPage"
import AccountPage from "../pages/user/AccountPage"


const MainRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/:id" element={<OnePostPage/>} />
                <Route path="/newpost" element={<CreateNewPost />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/myaccount" element={<AccountPage />} />
            </Routes>
        </>
    )
}

export default MainRouter