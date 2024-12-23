import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Logout() {
  const [authUser, setAuthUser] = useAuth();

  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("Users");
      window.location.reload();
      toast.success("Log out successfully");
    } catch (error) {
      toast.error("Error : ", error.message);
    }
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        type="button"
        className="btn m-2 btn-danger"
      >
        Log out
      </button>
    </div>
  );
}

export default Logout;
