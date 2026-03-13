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
    setLoading(true)
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/job/add/new/job`,
        formData,
        { withCredentials: true },
      );

      showSuccessToast(res.data.message || "Job added successfully");
      navigate("/dashboard")
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
      <div className="min-h-screen mb-14">
        {/* Back Button */}
        <div className="px-4 pt-6 mb-6 sm:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border py-3 pr-4 pl-3 rounded-lg text-gray-700 hover:text-black font-semibold transition"
          >
            <IoArrowBack className="text-xl" />
            Back
          </button>
        </div>

        <div className="max-w-xl mx-4 sm:mx-auto mt-1 mb-12 bg-white rounded-2xl shadow-lg border p-3 sm:p-6  sm:px-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mt-4 mb-8">
            Add New Job
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <div>
              <label className="block mb-1 font-medium">Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Position Applied */}
            <div>
              <label className="block mb-1 font-medium">
                Position Applied *
              </label>
              <input
                type="text"
                name="positionApplied"
                value={formData.positionApplied}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Company City */}
            <div>
              <label className="block mb-1 font-medium">Company City *</label>
              <input
                type="text"
                name="companyCity"
                value={formData.companyCity}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Apply Method */}
            <div>
              <label className="block mb-1 font-medium">Apply Method *</label>
              <select
                name="applyMethod"
                value={formData.applyMethod}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 bg-transparent"
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
              <div>
                <label className="block mb-1 font-medium">HR Email *</label>
                <input
                  type="email"
                  name="hrEmail"
                  value={formData.hrEmail}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
            )}

            {/* Job Link */}
            {formData.applyMethod && formData.applyMethod !== "email" && (
              <div>
                <label className="block mb-1 font-medium">Job Link *</label>
                <input
                  type="text"
                  name="jobLink"
                  value={formData.jobLink}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
            )}

            {/* Work Mode */}
            <div>
              <label className="block mb-1 font-medium">Work Mode *</label>
              <select
                name="workMode"
                value={formData.workMode}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 bg-transparent"
              >
                <option value="onsite">Onsite</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            {/* Applied Date */}
            <div>
              <label className="block mb-1 font-medium">Applied Date *</label>
              <input
                type="date"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full max-w-lg border rounded-md px-3 py-2 bg-transparent"
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer</option>
                <option value="save_later">Save Later</option>
              </select>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-2 font-semibold rounded-lg bg-blue-200 text-white hover:bg-blue-500 transition"
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewJobForm;
