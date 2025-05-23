import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Logout() {
  const navigate = useNavigate();
  const [authUser, updateAuthUser] = useAuth();

  const handleLogout = () => {
    updateAuthUser(null);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger m-2">
      Logout
    </button>
  );
}

export default Logout;
