import GetAllPostHome from "../components/post/GetAllPost";
import GetAllCategoriesPage from "./categories/GetAllCategoriesPage";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="getAllPost">
        <GetAllPostHome></GetAllPostHome>
      </div>
      <div className="getAllCategories">
        <GetAllCategoriesPage></GetAllCategoriesPage>
      </div>
    </div>
  );
};

export default HomePage;
