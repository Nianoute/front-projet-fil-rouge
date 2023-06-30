import jwtDecode from 'jwt-decode';

const getUserInToken = (access_token) => {
    const user = jwtDecode(access_token);
    return user;
}

const setTokenInLocalStorage = (access_token) => {
    localStorage.setItem('access_token', access_token);
}

const getTokenFromLocalStorage = () => {
    const access_token = localStorage.getItem('access_token');
    if(!access_token) return null;
    if(!isValidToken(access_token)) {
        removeTokenFromLocalStorage();
        return null;
    }
    return access_token;
}

const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('access_token');
}

const isValidToken = (access_token) => {
    const decodedToken = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime
}

const TokenService = {
    getUserInToken,
    setTokenInLocalStorage,
    getTokenFromLocalStorage,
    removeTokenFromLocalStorage
}

export default TokenService;