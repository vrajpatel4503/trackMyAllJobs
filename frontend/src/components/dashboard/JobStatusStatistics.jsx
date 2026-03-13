import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader.jsx";
import { showErrorToast } from "../../utils/ToastUtils.jsx";

const API_URL = import.meta.env.VITE_API_URL || "";

const JobStatusStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchJobStats = async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await axios.get(`${API_URL}/api/v1/job/jobs/statistics`, {
        withCredentials: true,
      });

      setStats(res.data.stats);
    } catch (error) {
      console.log(error);
      setError(true);

      showErrorToast(
        error.response?.data?.message || "Failed to fetch statistics",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobStats();
  }, []);

  // Loader UI
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50">
        <Loader />
      </div>
    );
  }

  // Error UI
  if (error || !stats) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-lg text-gray-600">
          Unable to load statistics. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
      <div className="bg-gray-100 shadow rounded-lg p-4 border text-center hover:shadow-lg shadow-gray-100 transition">
        <p className="text-sm sm:text-base font-semibold text-gray-600">
          Total Jobs
        </p>
        <h2 className="text-2xl font-bold text-gray-800">
          {stats.totalJobs || 0}
        </h2>
      </div>

      <div className="bg-blue-100 shadow rounded-lg p-4 border text-center hover:shadow-lg shadow-blue-100 transition">
        <p className="text-sm sm:text-base font-semibold text-blue-600">
          Applied
        </p>
        <h2 className="text-2xl font-bold text-blue-700">
          {stats.totalAppliedJobs || 0}
        </h2>
      </div>

      <div className="bg-amber-100 shadow rounded-lg p-4 border text-center hover:shadow-lg shadow-amber-100 transition">
        <p className="text-sm sm:text-base font-semibold text-amber-600">
          Interview
        </p>
        <h2 className="text-2xl font-bold text-amber-700">
          {stats.totalInterviews || 0}
        </h2>
      </div>

      <div className="bg-green-100 shadow rounded-lg p-4 border text-center hover:shadow-lg shadow-green-100 transition">
        <p className="text-sm sm:text-base font-semibold text-green-600">
          Offer
        </p>
        <h2 className="text-2xl font-bold text-green-700">
          {stats.totalOffer || 0}
        </h2>
      </div>

      <div className="bg-red-100 shadow rounded-lg p-4 border text-center hover:shadow-lg shadow-red-100 transition">
        <p className="text-sm sm:text-base font-semibold text-red-600">
          Rejected
        </p>
        <h2 className="text-2xl font-bold text-red-700">
          {stats.totalRejected || 0}
        </h2>
      </div>

      <div className="bg-slate-100 shadow rounded-lg p-4 border text-center hover:shadow-lg shadow-slate-100 transition">
        <p className="text-sm sm:text-base font-semibold text-slate-600">
          No Response
        </p>
        <h2 className="text-2xl font-bold text-slate-700">
          {stats.totalNoResponse || 0}
        </h2>
      </div>
    </div>
  );
};

export default JobStatusStatistics;
