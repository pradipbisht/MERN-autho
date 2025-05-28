// import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  try {
    const decoded = jwtDecode(token);

    if (!allowedRoles.includes(decoded.role)) {
      return <Navigate to="/unauthorized" />;
    }

    return children; // access granted
  } catch (err) {
    console.error("Invalid token", err);
    return <Navigate to="/sign-in" />;
  }
};

export default ProtectedRoute;
