import './App.scss';
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./app/layout/MainLayout";
import MainRouter from "./app/routers/MainRouter";
import { useState } from 'react';

function App() {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  return (
    <div className="App">
      <BrowserRouter>
        <MainLayout user={user} setUser={setUser}>
          <MainRouter user={user} setUser={setUser}/>
        </MainLayout>   
      </BrowserRouter>
    </div>
  );
}

export default App;
