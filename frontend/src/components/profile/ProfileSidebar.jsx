import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import Button from "../common/Button";

const ProfileSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* Mobile header */}
      <div className="lg:hidden mx-4 my-4 w-fit px-3 py-2 bg-white shadow-md rounded-lg">
        <Button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center"
        >
          <IoReorderThreeOutline size={32} />
          <span className="ml-2 text-lg font-medium">Menu</span>
        </Button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen bg-white shadow-lg
          w-64 md:w-72
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        {/* Sidebar Title */}
        <div className="p-6 text-xl font-bold border-b text-center">
          Profile Menu
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <NavLink
            to="/profile"
            end
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition-all duration-200 hover:bg-blue-100 ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700"
              }`
            }
          >
            My Profile
          </NavLink>

          <NavLink
            to="/profile/edit"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition-all duration-200 hover:bg-blue-100 ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700"
              }`
            }
          >
            Edit Profile
          </NavLink>

          <NavLink
            to="/profile/setting"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition-all duration-200 hover:bg-blue-100 ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700"
              }`
            }
          >
            Account Settings
          </NavLink>
        </nav>
      </aside>
    </div>
  );
};

export default ProfileSidebar;