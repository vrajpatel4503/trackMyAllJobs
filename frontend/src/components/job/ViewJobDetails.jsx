import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader.jsx";
import { showErrorToast, showSuccessToast } from "../../utils/ToastUtils.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const ViewJobDetails = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const statusCode = {
    applied: "bg-amber-300 text-amber-800",
    interview: "bg-blue-300 text-blue-800",
    rejected: "bg-red-300 text-red-800",
    offer: "bg-emerald-300 text-emerald-800",
    save_later: "bg-gray-300 text-gray-700",
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/job/get/job/${jobId}`, {
          withCredentials: true,
        });

        setJob(res.data.job);
      } catch (error) {
        showErrorToast(error.response?.data?.message || "Failed to fetch job");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  // handle delete submit
  const handleDeleteSubmit = async () => {
    try {
      const res = await axios.delete(
        `${API_URL}/api/v1/job/delete/job/${jobId}`,
        { withCredentials: true },
      );

      showSuccessToast(res.data.message || "Job successfully deleted");
      navigate("/dashboard");
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Failed to delete job");
    } finally {
      setLoading(false);
    }
  };

  // Format text
  const formatText = (text) => {
    if (!text) return "--";
    return text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!job) {
    return <p className="text-center mt-10 text-gray-600">Job not found</p>;
  }

  const isEmailMethod = job.showEmail;
  const showJobLink = job.showJobLink;

  return (
    <div className="min-h-screen">
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

      {/* Card */}
      <div className="max-w-2xl mx-4 sm:mx-auto mt-1 mb-12 bg-white rounded-xl shadow-md shadow-blue-200 border p-3 sm:p-6  sm:px-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mt-4 mb-16">
          Job Application Details
        </h1>

        <div className="space-y-6">
          {[
            ["Position Applied", job.positionApplied],
            ["Company Name", job.companyName],
            ["Company City", job.companyCity],
            ["Apply Method", formatText(job.applyMethod)],
            ["Work Mode", formatText(job.workMode)],
            [
              "Applied Date",
              job.appliedDate
                ? new Date(job.appliedDate).toLocaleDateString()
                : "--",
            ],
          ].map(([label, value], index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between gap-2 border-b pb-4"
            >
              <span className="text-gray-600 font-bold">{label}</span>

              <span className="text-gray-900 font-medium break-all sm:max-w-md text-right">
                {value || "--"}
              </span>
            </div>
          ))}

          {/* Email Section */}
          {isEmailMethod && (
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 border-b pb-4">
              <span className="text-gray-600 font-bold">HR Email</span>

              {job.hrEmail ? (
                <a
                  href={`mailto:${job.hrEmail?.trim()}`}
                  className="text-gray-900 font-medium break-all sm:max-w-md text-right"
                >
                  {job.hrEmail}
                </a>
              ) : (
                <span className="text-gray-900 font-medium text-right">--</span>
              )}
            </div>
          )}

          {/* Job Link Section */}
          {showJobLink && (
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 border-b pb-4">
              <span className="text-gray-600 font-bold">Job Link</span>

              {job.jobLink ? (
                <a
                  href={job.jobLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all sm:max-w-md text-right"
                >
                  View Job
                </a>
              ) : (
                <span className="text-gray-900 font-medium text-right">--</span>
              )}
            </div>
          )}

          {/* Status */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <span className="text-gray-600 font-bold">Application Status</span>

            <span
              className={`self-end sm:self-auto px-3 py-1 rounded-full text-sm font-semibold ${
                statusCode[job.status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {formatText(job.status)}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="px-6 py-2.5 rounded-lg border border-blue-600 bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white transition"
            onClick={() => navigate(`/dashboard/edit/job/${job._id}`)}
          >
            Edit Job
          </button>

          <button
            className="px-6 py-2.5 rounded-lg border border-red-600 bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition"
            onClick={handleDeleteSubmit}
          >
            Delete Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewJobDetails;
