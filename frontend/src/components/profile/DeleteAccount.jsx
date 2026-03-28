import React, { useState } from "react";
import axios from "axios";
import Loader from "../common/Loader.jsx";
import { showErrorToast, showSuccessToast } from "../../utils/ToastUtils.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice.js";
import Button from "../common/Button.jsx";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const { isLoggedIn, isDemo } = useSelector((state) => state.auth);

  const handleNavigate = () => {
    if (!isDemo) {
      navigate("/profile");
    }
  };

  const handleDeleteAccount = async () => {
    if (isDemo) {
      showErrorToast("Deleting account is not allowed in demo mode");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/api/v1/user/delete/account`, {
        data: { password },
        withCredentials: true,
      });

      showSuccessToast(res.data.message);

      dispatch(authActions.logout());

      navigate("/");
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || "Failed to delete account",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50">
          <Loader />
        </div>
      )}

      <div className="border border-red-300 rounded-xl p-5 sm:p-6 bg-red-50">
        {/* Header */}
        <h2 className="text-xl font-semibold text-red-600 mb-3">
          Delete Account
        </h2>

        {/* Warning Message */}
        <p className="text-sm text-gray-700 mb-4">
          This action is permanent and cannot be undone. Deleting your account
          will remove all your data, profile information, and settings.
        </p>

        {/* Warning Box */}
        <div className="bg-red-100 border border-red-300 rounded-md p-4 mb-5">
          <p className="text-sm text-red-700 font-medium">
            ⚠ Enter your password to confirm.
          </p>
        </div>

        <input
          type="text"
          placeholder="Enter your password to confirm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isDemo}
          className={`w-full h-11 px-4 border rounded-lg mb-4
            ${
              isDemo
                ? "bg-gray-100 cursor-not-allowed text-gray-500"
                : "focus:outline-none"
            }`}
        />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {isLoggedIn && (
            <Button
              onClick={handleNavigate}
              className={`w-full sm:flex-1 h-11 font-medium rounded-lg transition
                 ${
                   isDemo
                     ? "bg-gray-400 cursor-not-allowed"
                     : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                 }`}
            >
              Cancel
            </Button>
          )}

          {isLoggedIn && (
            <Button
              onClick={handleDeleteAccount}
              className={`w-full sm:flex-1 h-11 font-medium rounded-lg transition
                 ${
                   isDemo
                     ? "bg-gray-400 cursor-not-allowed"
                     : "bg-red-600 hover:bg-red-700 text-white"
                 }`}
            >
              Delete Account
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
