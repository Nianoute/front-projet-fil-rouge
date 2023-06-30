import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./app/layout/MainLayout";
import MainRouter from "./app/routers/MainRouter";
import { UserProvider } from "./setup/contexts/UserContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <MainLayout>
            <MainRouter />
          </MainLayout>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
