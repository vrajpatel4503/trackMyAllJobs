import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader.jsx";
import { showErrorToast, showSuccessToast } from "../../utils/ToastUtils.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import Button from "../common/Button.jsx";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const ViewJobDetails = () => {
  const { isLoggedIn, isDemo } = useSelector((state) => state.auth);

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

  const handleEditJobSubmit = () => {
    if (isDemo) {
      showErrorToast("Editing jobs is not allowed in the demo account");
    } else {
      navigate(`/dashboard/edit/job/${job._id}`);
    }
  };

  // handle delete submit
  const handleDeleteSubmit = async () => {
    if (isDemo) {
      showErrorToast("Deleting jobs is not allowed in the demo account");
      return;
    }

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
    <div className="w-full px-4 sm:px-8 py-6">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 border px-3 py-2 rounded-lg text-gray-700 hover:text-black font-medium transition"
        >
          <IoArrowBack className="text-lg" />
          Back
        </button>
      </div>

      {/* Card */}
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md shadow-blue-100 border p-5 sm:p-8">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-8">
          Job Application Details
        </h1>

        <div className="space-y-5">
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
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3"
            >
              <span className="text-gray-600 font-semibold">{label}</span>

              <span className="text-gray-900 font-medium wrap-break-words sm:max-w-sm">
                {value || "--"}
              </span>
            </div>
          ))}

          {/* Email Section */}
          {isEmailMethod && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3">
              <span className="text-gray-600 font-semibold">HR Email</span>

              {job.hrEmail ? (
                <a
                  href={`mailto:${job.hrEmail.trim()}`}
                  className="text-blue-600 wrap-break-words sm:max-w-sm"
                >
                  {job.hrEmail}
                </a>
              ) : (
                <span>--</span>
              )}
            </div>
          )}

          {/* Job Link */}
          {showJobLink && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3">
              <span className="text-gray-600 font-semibold">Job Link</span>

              {job.jobLink ? (
                <a
                  href={job.jobLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline wrap-break-words sm:max-w-sm"
                >
                  View Job
                </a>
              ) : (
                <span>--</span>
              )}
            </div>
          )}

          {/* Status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-gray-600 font-semibold">
              Application Status
            </span>

            <span
              className={`mt-2 sm:mt-0 px-4 py-3 sm:py-2 sm:px-3 rounded-full text-sm font-semibold ${
                statusCode[job.status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {formatText(job.status)}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          {isLoggedIn && (
            <Button
              onClick={handleEditJobSubmit}
              className={`h-11 px-6 sm:w-35 transition rounded-lg
                 ${
                   isDemo
                     ? "bg-gray-400 cursor-not-allowed"
                     : "bg-blue-600 hover:bg-blue-700 text-white"
                 }`}
            >
              Edit Job
            </Button>
          )}

          {isLoggedIn && (
            <Button
              onClick={handleDeleteSubmit}
              className={`h-11 px-6 sm:w-35 transition rounded-lg
                 ${
                   isDemo
                     ? "bg-gray-400 cursor-not-allowed"
                     : "bg-blue-600 hover:bg-blue-700 text-white"
                 }`}
            >
              Delete Job
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewJobDetails;
