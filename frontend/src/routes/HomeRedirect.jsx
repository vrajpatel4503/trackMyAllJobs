import React from "react";
import { Navigate } from "react-router-dom";
import Home from "../components/landing/Home.jsx";
import { useSelector } from "react-redux";

const HomeRedirect = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Home />;
};

export default HomeRedirect;
