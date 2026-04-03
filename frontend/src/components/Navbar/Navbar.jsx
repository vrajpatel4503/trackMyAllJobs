import { useState } from "react";
import Button from "../common/Button.jsx";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import LogoutButton from "../profile/LogoutButton";
import { showErrorToast } from "../../utils/ToastUtils.jsx";

const getInitials = (fullName) => {
  if (!fullName || typeof fullName !== "string") return "";
  return fullName
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0].toUpperCase())
    .slice(0, 2)
    .join("");
};

const Navbar = () => {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isLoggedIn, fullName, avatar, isDemo } = useSelector(
    (state) => state.auth,
  );

  const initials = getInitials(fullName);

  const handleNavigate = (path) => {
    navigate(path);
    setProfileOpen(false);
    setMobileMenuOpen(false);
  };

  // ---- Handle restricted navigation -----
  const handleDemoRestricted = (path) => {
    if (isDemo) {
      showErrorToast("Add new job is not allowed in demo mode");

      return;
    }
    handleNavigate(path);
  };

  return (
    <>
      {profileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setProfileOpen(false)}
        />
      )}

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className="bg-white shadow-md shadow-blue-100 relative z-50">
        {/* ================= DESKTOP NAVBAR ================= */}
        <div className="hidden sm:flex items-center justify-between py-2.5 px-3 md:px-5">
          {/* Logo */}
          <h1
            onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}
            className="text-xl md:text-2xl font-bold  text-gray-800 cursor-pointer"
          >
            TrackMyAllJobs
          </h1>

          {/* Center Menu */}
          {isLoggedIn && (
            <div className="flex items-center gap-8">
              <Button
                onClick={() => handleNavigate("/dashboard")}
                className="font-medium text-md md:text-lg text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Button>

              <Button
                onClick={() => handleNavigate("/dashboard/all/jobs")}
                className="font-medium text-md md:text-lg  text-gray-700 hover:text-blue-600"
              >
                All Jobs
              </Button>

              <Button
                onClick={() => handleDemoRestricted("/dashboard/add/job")}
                className={`font-medium text-md md:text-lg ${
                  isDemo
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Add New Job
              </Button>

              <Button
                onClick={() => handleNavigate("/dashboard/analytics")}
                className="font-medium text-md md:text-lg  text-gray-700 hover:text-blue-600"
              >
                Analytics
              </Button>
            </div>
          )}

          {/* Right Section */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate("/login")}
                className="border py-2 px-4 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Login
              </Button>

              <Button
                onClick={() => navigate("/register")}
                className="bg-blue-600 py-2 px-4 text-white hover:bg-blue-700"
              >
                Register
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-6 relative">
              {/* Notification */}
              {/* <button
                disabled={isDemo}
                className={`p-2 rounded-full border ${
                  isDemo ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                }`}
              >
                <FiBell size={18} />
              </button> */}

              {/* Profile */}
              <div className="relative">
                <Button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-1 md:px-1.5 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center overflow-hidden text-sm font-semibold shadow-sm">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      initials || "U"
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {initials}
                  </span>
                  {/* Dropdown icon */}
                  <span className="text-gray-500 text-xs">▼</span>{" "}
                </Button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border z-50 overflow-hidden">
                    <Button
                      onClick={() => handleNavigate("/profile")}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      My Profile
                    </Button>

                    <div className="border-t" />

                    <LogoutButton />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ================= MOBILE NAVBAR ================= */}
        <div className="sm:hidden flex items-center justify-between py-4 px-4">
          <h1
            onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}
            className="text-xl font-bold text-gray-800"
          >
            TrackMyAllJobs
          </h1>

          <button onClick={() => setMobileMenuOpen((prev) => !prev)}>
            {mobileMenuOpen ? (
              <IoCloseSharp size={26} />
            ) : (
              <GiHamburgerMenu size={26} />
            )}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileMenuOpen && (
          <div className="sm:hidden absolute top-16 right-3 w-60 bg-white rounded-xl shadow-xl border z-50 p-4 space-y-3">
            {!isLoggedIn ? (
              <>
                <Button
                  onClick={() => handleNavigate("/login")}
                  className="w-full py-2 border border-blue-600 text-blue-600"
                >
                  Login
                </Button>

                <Button
                  onClick={() => handleNavigate("/register")}
                  className="w-full py-2 bg-blue-600 text-white"
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => handleNavigate("/dashboard")}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                >
                  Dashboard
                </Button>

                <Button
                  onClick={() => handleNavigate("/dashboard/all/jobs")}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                >
                  All Jobs
                </Button>

                <Button
                  onClick={() => handleDemoRestricted("/dashboard/add/job")}
                  className={`w-full text-left px-3 py-2 rounded ${
                    isDemo
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Add New Job
                </Button>

                <Button
                  onClick={() => handleNavigate("/profile")}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                >
                  My Profile
                </Button>

                <div className="border-t pt-2">
                  <LogoutButton />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
