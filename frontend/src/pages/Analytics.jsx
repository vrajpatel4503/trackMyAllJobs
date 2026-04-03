import { useEffect, useState } from "react";
import axios from "axios";
import { showErrorToast } from "../utils/ToastUtils.jsx";
import JobStatusChart from "../components/chart/JobStatusChart";
import MonthlyJobsChart from "../components/chart/MonthlyJobsChart";
import Loader from "../components/common/Loader.jsx";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChartData = async () => {
    try {
      setLoading(true);

      // 🔥 Call BOTH APIs together (important)
      const [statusRes, monthlyRes] = await Promise.all([
        axios.get(`${API_URL}/api/v1/job/job-stats-chart`, {
          withCredentials: true,
        }),
        axios.get(`${API_URL}/api/v1/job/monthly-job-stats`, {
          withCredentials: true,
        }),
      ]);

      setStats(statusRes.data.stats);
      setMonthlyStats(monthlyRes.data.stats);
    } catch (error) {
      showErrorToast(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Analytics Dashboard
          </h2>
          <p className="text-gray-500 mt-1">
            Track your job application progress
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        )}

        {/* No Data */}
        {!loading && !stats && (
          <p className="text-red-500 text-center">No data found</p>
        )}

        {/* Charts */}
        {!loading && stats && (
          <div className="space-y-6">
            {/* Job Status Chart */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex justify-center">
              <div className="w-full max-w-md sm:max-w-lg md:max-w-full">
                <JobStatusChart stats={stats} />
              </div>
            </div>

            {/* Monthly Chart */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex justify-center">
              <div className="w-full max-w-md sm:max-w-lg md:max-w-full">
                <MonthlyJobsChart data={monthlyStats} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
