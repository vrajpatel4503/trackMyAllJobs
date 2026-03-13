import React, { useState } from "react";
import Button from "../common/Button.jsx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/ToastUtils.jsx";
import Loader from "../common/Loader.jsx";
import { authActions } from "../../store/authSlice.js";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/v1/user/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(authActions.logout());
      showSuccessToast(res.data.message || "Logged out successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      showErrorToast(error.response?.data?.message || "Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <Loader />
        </div>
      )}

      <Button
        onClick={handleLogout}
        className="w-full px-4 py-2 bg-red-100 text-red-600 font-semibold rounded-none hover:bg-red-500 hover:text-white transition-all duration-200 text-left"
      >
        Logout
      </Button>
    </>
  );
};

export default LogoutButton;
