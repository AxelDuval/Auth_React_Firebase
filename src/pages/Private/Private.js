import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Outlet, useLocation, Navigate } from "react-router-dom";

export default function PrivateHome() {
  const { currentUser } = useContext(UserContext);
  console.log("PRIVATE", currentUser);

  if (!currentUser) {
    <Navigate to="/" />;
  }

  return (
  <div className="container">
      <Outlet />
  </div>
  );
}
