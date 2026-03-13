import React from "react";
import { NavLink } from "react-router-dom";
import { FaRocket, FaClipboardList, FaRegBookmark } from "react-icons/fa";

const Home = () => {
  return (
    <div className="w-full px-4 md:px-16 py-10 flex flex-col items-center">
      
      {/* Header */}
      <p className="text-xl md:text-3xl font-bold text-blue-700 mb-6">
        <NavLink to="/">Job Application Tracker</NavLink>
      </p>

      {/* Main Heading */}
      <div className="text-center">
        <p className="text-2xl md:text-4xl font-semibold mb-2">
          Stay on top of your job search with smart tracking and effortless
          organization.
        </p>
      </div>

      {/* Features */}
      <div className="mt-10 w-full max-w-2xl space-y-6">
        
        {/* Feature 1 */}
        <div className="flex gap-4 p-4 rounded-lg bg-white shadow-md shadow-blue-100">
          <div className="h-12 w-12 flex items-center justify-center bg-gray-100 text-red-500 rounded-xl">
            <FaRocket className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold">
              Fast, Convenient, and Effortless Tracking
            </p>
            <p className="text-sm text-gray-600">
              Track your job search effortlessly — fast, organized, and always
              in control.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex gap-4 p-4 rounded-lg bg-white shadow-md shadow-blue-100">
          <div className="h-12 w-12 flex items-center justify-center bg-gray-100 text-red-500 rounded-xl">
            <FaClipboardList className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold">
              Organize job applications by status
            </p>
            <p className="text-sm text-gray-600">
              Visually manage each application — from applied to interview to
              offer.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex gap-4 p-4 rounded-lg bg-white shadow-md shadow-blue-100">
          <div className="h-12 w-12 flex items-center justify-center bg-gray-100 text-red-500 rounded-xl">
            <FaRegBookmark className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold">Save Jobs for Future Reference</p>
            <p className="text-sm text-gray-600">
              Save jobs and apply when the time is right — stay organized and in
              control.
            </p>
          </div>
        </div>
      </div>

      {/* Register Button */}
      <div className="mt-10 md:mt-12 pb-6">
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
