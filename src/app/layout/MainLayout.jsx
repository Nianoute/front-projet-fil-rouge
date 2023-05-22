import NavbarMain from "../components/ui/NavBar";

const MainLayout = ({ children, user, setUser }) => {
    return (
      <>
        <NavbarMain user={user} setUser={setUser} />
        <div>{children}</div>
      </>
    );
  };
  
  export default MainLayout;