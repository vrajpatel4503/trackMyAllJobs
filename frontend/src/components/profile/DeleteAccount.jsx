import React, { useState } from "react";
import axios from "axios";
import Loader from "../common/Loader.jsx";
import { showErrorToast, showSuccessToast } from "../../utils/ToastUtils.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice.js";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
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

      <div className="border border-red-200 rounded-xl p-5 sm:p-6 bg-red-50">
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
            ⚠ Type <span className="font-bold">PASSWORD</span> to confirm.
          </p>
        </div>

        <input
          type="text"
          placeholder="Enter your password to confirm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-11 px-4 border rounded-lg mb-4 focus:outline-none "
        />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="w-full sm:flex-1 h-11 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition">
            Cancel
          </button>

          <button
            className="w-full sm:flex-1 h-11 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
