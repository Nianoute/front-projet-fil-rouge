import './App.scss';
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./app/layout/MainLayout";
import MainRouter from "./app/routers/MainRouter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainLayout>
          <MainRouter />
        </MainLayout>   
      </BrowserRouter>
    </div>
  );
}

export default App;
