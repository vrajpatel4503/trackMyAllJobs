import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/ToastUtils.jsx";
import Loader from "../../components/common/Loader";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  // ---------- handle change -----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------- handle submit -----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/v1/user/register`,
        {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          password: formData.password,
          phoneNumber: formData.phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      showSuccessToast(res.data.message || "Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      showErrorToast(
        error.response?.data?.message ||
          "Failed to create account. Please try again.",
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

      <div className="h-full flex items-center justify-center py-24 px-4">
        <div
          className={`w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8 ${
            loading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Create Account 🚀
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-lg font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
