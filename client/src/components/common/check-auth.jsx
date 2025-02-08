import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  //check if user is authenticated
 // Redirect to dashboard if authenticated and trying to access login/register
if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
  if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  } else if (user?.role === "faculty") {
    return <Navigate to="/faculty/dashboard" />;
  } else {
    return <Navigate to="/student/dashboard" />;
  }
}



// Redirect to login if not authenticated
if (!isAuthenticated && !location.pathname.includes("/auth")) {
  return <Navigate to="/auth/login" />;
}


  //check if user is authenticated not show login and register page
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } 
    else if (user?.role === "faculty") {
      return <Navigate to="/faculty/dashboard" />;
    }
    else {
      return <Navigate to="/student/dashboard" />;
    }
  }

  // if user is authenticated and is not  admin
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role !== "faculty" &&
    location.pathname.includes("/faculty")
  ) {
    return <Navigate to="/unauth-page" />;
  }
  if (
    isAuthenticated &&
    user?.role !== "student" &&
    location.pathname.includes("/student")
  ) {
    return <Navigate to="/unauth-page" />;
  }


  // // if user is authenticated and is admin
  // if (
  //   isAuthenticated &&
  //   user?.role === "admin" &&
  //   location.pathname.includes("/shop")
  // ) {
  //   return <Navigate to="/admin/dashboard" />;
  // }



  return <>{children}</>;
};

export default CheckAuth;
