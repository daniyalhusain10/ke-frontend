// PreventLoginAccess.jsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PreventLoginAccess = ({ children }) => {
  const navigate = useNavigate();
  
  // Jis route par token hone par redirect karna hai, uska path yahan dein.
  const DASHBOARD_PATH = "/admin-dashboard"; 

  useEffect(() => {
    // Check if the token (username) exists in localStorage
    const token = localStorage.getItem("ather-husain");

    if (token) {
      // ✅ Agar token mila, to user ko seedha dashboard par bhej do
      // 'replace: true' se history mein back button se wapas aana mushkil ho jata hai
      navigate(DASHBOARD_PATH, { replace: true });
    }
    // else: agar token nahi hai, to user ko login page par rehne do
  }, [navigate]);

  // Agar token nahi mila, to children (Login Page) ko render karo
  return <>{children}</>;
};

export default PreventLoginAccess;