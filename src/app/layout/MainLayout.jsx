import NavbarMain from "../components/ui/NavBar";

const MainLayout = ({ children }) => {
  return (
    <>
      <NavbarMain />
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
