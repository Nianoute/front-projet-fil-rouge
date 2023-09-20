import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import HomePage from "../pages/HomePage";
import CreateNewPost from "../pages/posts/CreateNewPostPage";
import OnePostPage from "../pages/posts/OnePostPage";
import AccountPage from "../pages/user/AccountPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import EditUserPage from "../pages/user/EditUserPage";
import UpdatePostPage from "../pages/posts/UpdatePostPage";
import CreatePostVariant from "../pages/posts/postVariants/CreatePostVariant";
import UpdatePostVariant from "../pages/posts/postVariants/UpdatePostVariant";
import ProtectedRoute from "./ProtectedRoute";
import CreateNewCategory from "../pages/categories/CreateNewCategory"
import AdminProtectedRoute from "./AdminProtectedRoute";
import OneCategoryPage from "../pages/categories/OneCategoryPage";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<h1>404</h1>} />

        <Route path="/:id" element={<OnePostPage />} />

        <Route path="/newpost" element={
          <ProtectedRoute to="/auth/login" bool={false}>
            <CreateNewPost />
          </ProtectedRoute>
        } />
        <Route path="/editpost/:id" element={
          <ProtectedRoute to="/auth/login" bool={false}>
            <UpdatePostPage />
          </ProtectedRoute>
        } />
        <Route path="/newpost-variant" element={
          <ProtectedRoute to="/auth/login" bool={false}>
            <CreatePostVariant />
          </ProtectedRoute>} />
        <Route path="/updatepost-variant" element={
          <ProtectedRoute to="/auth/login" bool={false}>
            <UpdatePostVariant />
          </ProtectedRoute>
        } />

        <Route path="/myaccount" element={
          <ProtectedRoute to="/auth/login" bool={false}>
            <AccountPage />
          </ProtectedRoute>
        } />
        <Route path="/myaccount-edit" element={
          <ProtectedRoute to="/auth/login" bool={false}>
            <EditUserPage />
          </ProtectedRoute>
        } />

        <Route path="/auth/register" element={
          <ProtectedRoute to="/myaccount" bool={true}>
            <RegisterPage />
          </ProtectedRoute>
        } />
        <Route path="/auth/login" element={
          <ProtectedRoute to="/myaccount" bool={true}>
            <LoginPage />
          </ProtectedRoute>
        } />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/auth/reset-password/:token"
          element={<ResetPasswordPage />}
        />

        <Route path="/create-category" element={
          <AdminProtectedRoute to="/auth/login" bool={false}>
            <CreateNewCategory />
          </AdminProtectedRoute>
        } />
        <Route path="/categories/:id" element={<OneCategoryPage />} />
      </Routes>
    </>
  );
};

export default MainRouter;
