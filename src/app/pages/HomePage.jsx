import GetAllPostHome from "../components/post/GetAllPost"
import TokenService from "../../setup/services/token.services";

const HomePage = () => {
  TokenService.getTokenFromLocalStorage();
    return (
      <>
        <h1>Listes des posts</h1>
        <GetAllPostHome></GetAllPostHome>

      </>
    )
}

export default HomePage