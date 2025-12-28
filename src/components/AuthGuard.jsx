import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check token in localStorage
    const token = localStorage.getItem("ather-husain");

    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AuthGuard;
