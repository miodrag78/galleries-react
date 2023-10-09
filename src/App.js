import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import CreateGallery from "./pages/CreateGallery";
import ViewGallery from "./pages/ViewGallery";
import UsersGalleries from "./pages/UsersGalleries";
import MyGalleries from "./pages/MyGalleries";
import ProtectedRoute from "./shared/ProtectedRoute";

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
        <Route index element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/create-gallery"
          element={
            <ProtectedRoute>
              <CreateGallery/>
            </ProtectedRoute>
          }
        ></Route>
        <Route path="galleries/:id" element={<ViewGallery />}></Route>
        <Route
          path="my-galleries"
          element={
            <ProtectedRoute>
              <MyGalleries />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="authors/:id" element={<UsersGalleries />}></Route>
        <Route
          path="edit-gallery/:id"
          element={
            <ProtectedRoute>
              <CreateGallery />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;