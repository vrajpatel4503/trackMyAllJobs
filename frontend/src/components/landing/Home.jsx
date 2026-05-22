import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaClipboardList,
  FaRegBookmark,
  FaTasks,
  FaFolderOpen,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="w-full px-4 md:px-16 py-10 flex flex-col items-center">
      {/* Header */}
      <p className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">
        <NavLink to="/">Job Application Tracker</NavLink>
      </p>

      {/* Main Heading */}
      <div className="text-center">
        <p className="text-xl md:text-2xl font-semibold mb-2">
          Manage your complete job search journey efficiently with smart
          tracking, organized records, and seamless application management
          tools.
        </p>
      </div>

      {/* Features */}
      <div className="mt-10 w-full max-w-2xl space-y-5 px-2">
        {/* Feature 1 */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center bg-red-50 text-red-500 rounded-xl shrink-0 mx-auto sm:mx-0">
            <FaTasks className="h-6 w-6" />
          </div>

          <div className="text-center sm:text-left">
            <p className="font-semibold text-gray-800 text-base sm:text-lg">
              Smart Job Tracking Made Simple
            </p>
            <p className="text-sm text-gray-600 mt-1 leading-5">
              Easily manage applications, interviews, and opportunities with a
              clean and organized tracking experience.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center bg-blue-50 text-blue-500 rounded-xl shrink-0 mx-auto sm:mx-0">
            <FaFolderOpen className="h-6 w-6" />
          </div>

          <div className="text-center sm:text-left">
            <p className="font-semibold text-gray-800 text-base sm:text-lg">
              Organize Your Career Journey Better
            </p>
            <p className="text-sm text-gray-600 mt-1 leading-5">
              Keep all your job applications, statuses, and interview schedules
              organized in one convenient place.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center bg-yellow-50 text-yellow-500 rounded-xl shrink-0 mx-auto sm:mx-0">
            <FaRegBookmark className="h-4 w-4" />
          </div>

          <div className="text-center sm:text-left">
            <p className="font-semibold text-gray-800 text-base sm:text-lg">
              Save Jobs for Later Applications
            </p>
            <p className="text-sm text-gray-600 mt-1 leading-5">
              Store job opportunities securely, manage saved listings, and apply
              whenever the timing feels right.
            </p>
          </div>
        </div>
      </div>

      {/* Register Button */}
      <div className="mt-10 md:mt-12">
        <NavLink to="/register">
          <button className="border border-gray-200 text-blue-600 hover:bg-blue-500 hover:text-white transition px-8 py-3 rounded-full text-lg font-semibold shadow-md shadow-blue-100">
            Register – it’s 100% free!
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
