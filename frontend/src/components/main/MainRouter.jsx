import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../creditionals/Login";
import Signup from "../creditionals/Signup";
import Home from "../creditionals/Home";
import RefrshHandle from "./RefrshHandle";

const MainRouter = () => {
  const [isAuther, setIaSuther] = useState(false);
 
  
  const PrivateRoute = ({ element }) => {
    return isAuther ? element : <Navigate to="/login" />
  }
  return (
    <>
    <RefrshHandle setIaSuther={setIaSuther} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />

      </Routes>
    </>
  );
};

export default MainRouter;
