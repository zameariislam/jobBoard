import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/reusable/Loading";
import { useSelector } from "react-redux";

  const PrivateRoute = ({ children }) => {
  const {email,isLoading}=useSelector(state=>state.auth)
  const { pathname } = useLocation();
  console.log("private",isLoading)
 
 

  if (isLoading) {
    return <Loading />;
  }

  if ( !email) {
    return <Navigate to='/login' state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
