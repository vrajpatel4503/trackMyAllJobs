import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/common/Loader.jsx";
import { showErrorToast } from "../../utils/ToastUtils.jsx";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const AllJobsPage = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(false);

  const statusCode = {
    applied: "bg-amber-300 text-amber-800",
    interview: "bg-blue-300 text-blue-800",
    rejected: "bg-red-300 text-red-800",
    offer: "bg-emerald-300 text-emerald-800",
    save_later: "bg-gray-300 text-gray-700",
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/v1/job/get/all/jobs`, {
        withCredentials: true,
      });

      setJobs(res.data.jobs || []);
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const formatText = (text) => {
    if (!text) return "--";
    return text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50">
          <Loader />
        </div>
      )}

      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">All Job Applications</h2>

        {/* If No Jobs found */}
        {jobs.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-2xl font-semibold text-gray-500">
              No Jobs Found
            </p>
          </div>
        ) : (
          /* If Jobs Exist Show Table */
          <div className="overflow-x-auto bg-white rounded-xl shadow-md shadow-blue-100">
            <table className="min-w-full text-md">
              {/* Table Head */}
              <thead className="bg-gray-200 border-b text-gray-600 uppercase text-sm tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-center">Company</th>
                  <th className="px-6 py-4 text-center">Position</th>
                  <th className="px-6 py-4 text-center">Apply Method</th>
                  <th className="px-6 py-4 text-center">HR Email</th>
                  <th className="px-6 py-4 text-center">Job Link</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y">
                {jobs.slice(0, 4).map((job) => (
                  <tr
                    key={job._id}
                    className="hover:bg-blue-50 transition duration-200"
                  >
                    {/* Company */}
                    <td className="px-6 py-4 text-center font-semibold text-gray-800">
                      {job.companyName}
                    </td>

                    {/* Position */}
                    <td className="px-6 py-4 text-center text-gray-600">
                      {job.positionApplied}
                    </td>

                    {/* Apply Method */}
                    <td className="px-6 py-4 text-center text-gray-600 capitalize">
                      {job.applyMethod}
                    </td>

                    {/* HR Email */}
                    <td className="px-6 py-4 text-center text-gray-600 max-w-45 truncate">
                      {job.hrEmail || "-"}
                    </td>

                    {/* Job Link */}
                    <td className="px-6 py-4 text-center">
                      {job.jobLink ? (
                        <a
                          href={job.jobLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          View Job
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusCode[job.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {formatText(job.status)}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/view/job/${job._id}`)
                        }
                        className="px-4 py-1.5 text-sm font-medium text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AllJobsPage;
