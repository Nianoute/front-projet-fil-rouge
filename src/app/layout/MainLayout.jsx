import NavbarMain from "../components/ui/NavBar";

const MainLayout = ({ children }) => {
    return (
      <>
        <NavbarMain />
        <div maxWidth="lg">{children}</div>
      </>
    );
  };
  
  export default MainLayout;