import React, { useState } from "react";
import axios from "axios";
import Loader from "../common/Loader";
import { showErrorToast, showSuccessToast } from "../../utils/ToastUtils";
import Button from "../common/Button.jsx";
import { useSelector } from "react-redux";

const UpdateEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const { isLoggedIn, isDemo } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async () => {
    if (isDemo) {
      showErrorToast("Updating email is not allowed in demo mode");
      return;
    }

    if (!email) {
      showErrorToast("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.patch(
        `${API_URL}/api/v1/user/update/email`,
        { email },
        { withCredentials: true },
      );

      showSuccessToast(res.data.message || "Email updated successfully");
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Failed to update email");
    } finally {
      setLoading(false);
      setEmail("");
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
        <h2 className="text-lg font-semibold mb-4">Update Email</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter new email"
            disabled={isDemo}
            className={`flex-1 h-11 px-4 py-3 border rounded-lg 
            ${
              isDemo
                ? "bg-gray-100 cursor-not-allowed text-gray-500"
                : "focus:outline-none"
            }`}
          />

          {isLoggedIn && (
            <Button
              onClick={handleEmailSubmit}
              className={`h-11 px-6 sm:w-35 transition rounded-lg
                 ${
                   isDemo
                     ? "bg-gray-400 cursor-not-allowed"
                     : "bg-blue-600 hover:bg-blue-700 text-white"
                 }`}
            >
              Update
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateEmail;
