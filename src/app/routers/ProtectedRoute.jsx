import { Navigate } from "react-router-dom";
import TokenService from "../../setup/services/token.services";

const ProtectedRoute = ({ children, to, bool }) => {

    let protected_accessToken = TokenService.getTokenFromLocalStorage();

    if (protected_accessToken) protected_accessToken = true
    else protected_accessToken = false

    if (protected_accessToken === bool) return <Navigate to={to} />;

    return children;
}

export default ProtectedRoute;