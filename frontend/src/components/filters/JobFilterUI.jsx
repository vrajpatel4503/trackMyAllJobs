import React, { useState } from "react";
import Button from "../common/Button.jsx";
import axios from "axios";
import { showErrorToast } from "../../utils/ToastUtils.jsx";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const JobFilterUI = ({ setJobs }) => {
  const [filters, setFilters] = useState({
    status: "",
    workMode: "",
    applyMethod: "",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleClear = () => {
    setFilters({
      status: "",
      workMode: "",
      applyMethod: "",
    });
  };

  const query = () => {
    const params = new URLSearchParams();

    if (filters.status) params.append("status", filters.status);
    if (filters.workMode) params.append("workMode", filters.workMode);
    if (filters.applyMethod) params.append("applyMethod", filters.applyMethod);

    return params.toString();
  };

  const handleApplyFilter = async () => {
    try {
      const url = query();

      const res = await axios.get(`${API_URL}/api/v1/job/filter?${url}`, {
        withCredentials: true,
      });

      console.log(res);

      setJobs(res.data.jobs);
    } catch (error) {
      console.log(error);
      showErrorToast(error.response?.data?.message);
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md shadow-blue-100 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4">
        <div className="grid grid-cols-2 gap-3 flex-1 lg:flex lg:gap-4">
          <div className="col-span-1 flex-1 min-w-40">
            {/* ---- Status ---- */}
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="status"
              value={filters.status}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="no_response">No Response</option>
            </select>
          </div>

          {/* ---- Work Mode ---- */}
          <div className="col-span-1 flex-1 min-w-40">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Work Mode
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="workMode"
              value={filters.workMode}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option value="remote">Remote</option>
              <option value="onsite">Onsite</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* ---- Apply Method ---- */}
          <div className="col-span-2 lg:col-span-1 flex-1 min-w-40">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Apply Method
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="applyMethod"
              value={filters.applyMethod}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option value="email">Email</option>
              <option value="website">Website</option>
              <option value="linkedin">LinkedIn</option>
              <option value="naukri">Naukri</option>
              <option value="indeed">Indeed</option>
              <option value="referral">Referral</option>
              <option value="other_job_portal">Other Job Portal</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 lg:ml-auto">
          <Button
            className="flex-1 lg:flex-none px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition whitespace-nowrap"
            onClick={handleClear}
          >
            Clear
          </Button>

          <Button
            className="flex-1 lg:flex-none px-5 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition whitespace-nowrap"
            onClick={handleApplyFilter}
          >
            Apply Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobFilterUI;
