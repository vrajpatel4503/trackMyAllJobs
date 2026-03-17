import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/ToastUtils";
import Loader from "../common/Loader";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const AddNewJobForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    positionApplied: "",
    companyCity: "",
    applyMethod: "",
    hrEmail: "",
    jobLink: "",
    workMode: "onsite",
    appliedDate: "",
    status: "applied",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      // Auto clear opposite field
      if (name === "applyMethod") {
        if (value === "email") {
          updatedData.jobLink = "";
        } else {
          updatedData.hrEmail = "";
        }
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/job/add/new/job`,
        formData,
        { withCredentials: true },
      );

      showSuccessToast(res.data.message || "Job added successfully");
      navigate("/dashboard");
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Failed to add job");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {/* Back Button */}
      <div className="w-full px-4 sm:px-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 border px-3 py-2 rounded-lg text-gray-700 hover:text-black font-medium transition"
        >
          <IoArrowBack className="text-lg" />
          Back
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader />
        </div>
      ) : (
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-md shadow-blue-100 border">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-8">
              Add New Job
            </h2>

            <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
              {/* Company Name */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Position Applied */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Position Applied *
                </label>
                <input
                  type="text"
                  name="positionApplied"
                  value={formData.positionApplied}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Company City */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Company City *
                </label>
                <input
                  type="text"
                  name="companyCity"
                  value={formData.companyCity}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Apply Method */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Apply Method *
                </label>
                <select
                  name="applyMethod"
                  value={formData.applyMethod}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 bg-transparent focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Method</option>
                  <option value="email">Email</option>
                  <option value="website">Website</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="naukri">Naukri</option>
                  <option value="indeed">Indeed</option>
                  <option value="referral">Referral</option>
                  <option value="other_job_portal">Other Job Portal</option>
                </select>
              </div>

              {/* HR Email */}
              {formData.applyMethod === "email" && (
                <div className="sm:col-span-2">
                  <label className="block mb-1 font-medium text-gray-700">
                    HR Email *
                  </label>
                  <input
                    type="email"
                    name="hrEmail"
                    value={formData.hrEmail}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              )}

              {/* Job Link */}
              {formData.applyMethod && formData.applyMethod !== "email" && (
                <div className="sm:col-span-2">
                  <label className="block mb-1 font-medium text-gray-700">
                    Job Link *
                  </label>
                  <input
                    type="text"
                    name="jobLink"
                    value={formData.jobLink}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              )}

              {/* Work Mode */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Work Mode *
                </label>
                <select
                  name="workMode"
                  value={formData.workMode}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 bg-transparent focus:ring-2 focus:ring-blue-400"
                >
                  <option value="onsite">Onsite</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              {/* Applied Date */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Applied Date *
                </label>
                <input
                  type="date"
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Status */}
              <div className="sm:col-span-2">
                <label className="block mb-1 font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 bg-transparent focus:ring-2 focus:ring-blue-400"
                >
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="rejected">Rejected</option>
                  <option value="offer">Offer</option>
                  <option value="save_later">Save Later</option>
                </select>
              </div>

              {/* Submit */}
              <div className="sm:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full py-2.5 font-semibold rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition"
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewJobForm;
