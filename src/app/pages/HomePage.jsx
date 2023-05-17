import GetAllPostHome from "../components/post/GetAllPost"
import TokenService from "../../setup/services/token.services";

const HomePage = () => {
  TokenService.getTokenFromLocalStorage();
    return (
      <div className="homePage">
        <div className="getAllPost">
          <GetAllPostHome></GetAllPostHome>
        </div>
      </div>
    )
}

export default HomePage