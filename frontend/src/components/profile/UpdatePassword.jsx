import React, { useState } from "react";
import axios from "axios";
import Loader from "../common/Loader.jsx";
import { showErrorToast, showSuccessToast } from "../../utils/ToastUtils.jsx";
import Button from "../common/Button.jsx";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = async () => {
    if (!password) {
      showErrorToast("Please enter a new password");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.patch(
        `${API_URL}/api/v1/user/update/password`,
        { password },
        { withCredentials: true },
      );

      showSuccessToast(res.data.message || "Password updated successfully");

      setPassword("");
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || "Failed to update password",
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

      <div>
        <h2 className="text-lg font-semibold mb-4">Update Password</h2>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <input
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="flex-1 h-11 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Button
            onClick={handlePasswordSubmit}
            className="h-11 px-6 sm:w-35 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Update
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
