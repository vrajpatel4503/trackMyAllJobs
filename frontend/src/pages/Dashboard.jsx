import React from "react";
import Button from "../components/common/Button.jsx";
import JobList from "../components/job/JobList.jsx";
import { Outlet } from "react-router-dom";
import JobStatusStatistics from "../components/dashboard/JobStatusStatistics.jsx";

const Dashboard = () => {
  return (
    <div className="px-4 py-4">
      <div className="mt-1">
        <JobStatusStatistics />
      </div>

      <div className="mt-6">
        <Outlet />
      </div>

      <div className="mt-6">
        <JobList />
      </div>
    </div>
  );
};
export default Dashboard;
