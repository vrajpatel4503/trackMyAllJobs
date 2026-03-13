import React, { useState } from "react";
import axios from "axios";
import Loader from "../common/Loader";
import { showErrorToast, showSuccessToast } from "../../utils/ToastUtils";
import Button from "../common/Button.jsx";

const UpdateEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async () => {
    if (!email) {
      showErrorToast("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.patch(
        `${API_URL}/api/v1/user/update/email`,
        { email },
        { withCredentials: true }
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

      <div className="mb-8 sm:mb-10">
        <h2 className="text-base sm:text-lg font-semibold mb-3">
          Update Email
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter new email"
            className="flex-1 h-11 sm:h-12 p-3 border rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Button
            onClick={handleEmailSubmit}
            className="h-11 sm:h-12 w-full sm:w-auto sm:min-w-40 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Update Email
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdateEmail;