import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // { email, password }
      });

      const result = await response.json();

      if (response.ok) {
        // Login success
        toast.success(`Welcome ${result.user.username}!`);

        // Store token/username permanently
        localStorage.setItem("ather-husain", result.user.username);

        // Redirect to admin dashboard
        navigate("/admin-dashboard");

        console.log("Login Success:", result);
      } else {
        // Backend returned an error
        toast.error(result.message || "Login failed");
        console.log("Login Error:", result);
      }
    } catch (error) {
      // Network or fetch error
      console.error("Network Error:", error);
      toast.error("Network error! Please try again.");
    }
  };

  return login;
};

export default useLogin;
