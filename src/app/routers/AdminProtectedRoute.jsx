import { Navigate } from "react-router-dom";
import TokenService from "../../setup/services/token.services";
import jwtDecode from "jwt-decode";

const AdminProtectedRoute = ({ children, to, bool }) => {
    let admin_accessToken = TokenService.getTokenFromLocalStorage();
    if (admin_accessToken) {
        const isAdmin = jwtDecode(admin_accessToken)
        if (isAdmin.admin === true) admin_accessToken = true
        else admin_accessToken = false
    } else admin_accessToken = false

    if (admin_accessToken === bool) return <Navigate to={to} />;

    return children;
}

export default AdminProtectedRoute;