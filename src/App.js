import { Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./auth/Register";
import Login from "./auth/Login";
import { useContext, useEffect } from "react";
import UserContext from "./storage/UserContext";

function App() {
  const { checkToken } = useContext(UserContext);
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="App">
      
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      
    </div>
  );
}

export default App;