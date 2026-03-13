import React from "react";
import Button from "../components/common/Button.jsx";
import JobList from "../components/job/JobList.jsx";
import { Outlet } from "react-router-dom";
import JobStatusStatistics from "../components/dashboard/JobStatusStatistics.jsx";

const Dashboard = () => {
  return (
    <>
      <div className="px-6 py-8 mt-6">
        <JobStatusStatistics />
      </div>

      <Outlet />

      <div className="">
        <JobList />
      </div>
    </>
  );
};

export default Dashboard;
