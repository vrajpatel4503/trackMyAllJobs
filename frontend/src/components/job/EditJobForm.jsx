import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader.jsx";
import { showErrorToast, showSuccessToast } from "../../utils/ToastUtils.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const EditJobForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    companyName: "",
    positionApplied: "",
    companyCity: "",
    applyMethod: "",
    hrEmail: "",
    jobLink: "",
    workMode: "",
    appliedDate: "",
    status: "applied",
  });

  // ------- format date filed ---------
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  // Fetch job details
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/job/get/job/${jobId}`, {
          withCredentials: true,
        });

        const job = res.data?.job;

        setData({
          companyName: job.companyName || "",
          positionApplied: job.positionApplied || "",
          companyCity: job.companyCity || "",
          applyMethod: job.applyMethod || "",
          hrEmail: job.hrEmail || "",
          jobLink: job.jobLink || "",
          workMode: job.workMode || "",
          appliedDate: formatDate(job.appliedDate),
          status: job.status || "applied",
        });

        setLoading(false);
      } catch (error) {
        showErrorToast(error.response?.data?.message || "Failed to fetch job");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(
        `${API_URL}/api/v1/job/update/job/${jobId}`,
        data,
        { withCredentials: true },
      );

      showSuccessToast(res.data?.message || "Job updated successfully");

      navigate(`/dashboard/view/job/${jobId}`);
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

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
              Edit Job
            </h2>

            <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
              {/* Company Name */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={data.companyName}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Position Applied */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Position Applied
                </label>
                <input
                  type="text"
                  name="positionApplied"
                  value={data.positionApplied}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Company City */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Company City
                </label>
                <input
                  type="text"
                  name="companyCity"
                  value={data.companyCity}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Apply Method */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Apply Method
                </label>
                <select
                  name="applyMethod"
                  value={data.applyMethod}
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
                </select>
              </div>

              {/* Conditional HR Email */}
              {data.applyMethod === "email" && (
                <div className="sm:col-span-2">
                  <label className="block mb-1 font-medium text-gray-700">
                    HR Email
                  </label>
                  <input
                    type="email"
                    name="hrEmail"
                    value={data.hrEmail}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              )}

              {/* Conditional Job Link */}
              {data.applyMethod && data.applyMethod !== "email" && (
                <div className="sm:col-span-2">
                  <label className="block mb-1 font-medium text-gray-700">
                    Job Link
                  </label>
                  <input
                    type="text"
                    name="jobLink"
                    value={data.jobLink}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              )}

              {/* Work Mode */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Work Mode
                </label>
                <select
                  name="workMode"
                  value={data.workMode}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 bg-transparent focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Work Mode</option>
                  <option value="onsite">Onsite</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              {/* Applied Date */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Applied Date
                </label>
                <input
                  type="date"
                  name="appliedDate"
                  value={data.appliedDate}
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
                  value={data.status}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 bg-transparent focus:ring-2 focus:ring-blue-400"
                >
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="rejected">Rejected</option>
                  <option value="offer">Offer</option>
                  <option value="no_response">No Response</option>
                </select>
              </div>

              {/* Submit */}
              <div className="sm:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full border py-2.5 font-semibold rounded-lg text-blue-600 bg-blue-200 hover:text-white hover:bg-blue-600 transition"
                >
                  Update Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditJobForm;
