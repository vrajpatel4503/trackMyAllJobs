import React, { useState } from "react";
import axios from "axios";
import Loader from "../common/Loader.jsx";
import { showErrorToast, showSuccessToast } from "../../utils/ToastUtils.jsx";
import Button from "../common/Button.jsx";
import { useSelector } from "react-redux";

const UpdatePhoneNumber = () => {
  const { isLoggedIn, isDemo } = useSelector((state) => state.auth);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePhoneNumberSubmit = async () => {
    if (isDemo) {
      showErrorToast("Updating phone number is not allowed in demo mode");
      return;
    }

    if (!phoneNumber) {
      showErrorToast("Please enter a phone number");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.patch(
        `${API_URL}/api/v1/user/update/phoneNumber`,
        { phoneNumber },
        { withCredentials: true },
      );

      showSuccessToast(
        res.data.message || "Phone number updated successfully!",
      );

      setPhoneNumber("");
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || "Failed to update phone number",
      );

      setPhoneNumber("");
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
        <h2 className="text-lg font-semibold mb-4">Update Phone Number</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="tel"
            value={phoneNumber}
            onChange={handleChange}
            placeholder="Enter new phone number"
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
              onClick={handlePhoneNumberSubmit}
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

export default UpdatePhoneNumber;
