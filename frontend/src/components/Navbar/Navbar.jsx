import { useState } from "react";
import Button from "../common/Button.jsx";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import LogoutButton from "../profile/LogoutButton";

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

  const { isLoggedIn, fullName, avatar } = useSelector((state) => state.auth);

  const initials = getInitials(fullName);

  const handleNavigate = (path) => {
    navigate(path);
    setProfileOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {profileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setProfileOpen(false)}
        />
      )}

      <div className="bg-white shadow-md shadow-blue-100 relative z-50">
        {/* ================= DESKTOP NAVBAR ================= */}
        <div className="hidden sm:flex items-center justify-between py-4 px-8">
          {/* Logo */}
          <h1
            onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}
            className="text-2xl font-bold tracking-wide text-gray-800 cursor-pointer"
          >
            TrackMyAllJobs
          </h1>

          {/* Center Menu */}
          {isLoggedIn && (
            <div className="flex items-center gap-8">
              <button
                onClick={() => navigate("/dashboard/all/jobs")}
                className="font-medium text-xl text-gray-700 hover:text-blue-600"
              >
                All Jobs
              </button>

              <button
                onClick={() => navigate("/dashboard/add/job")}
                className="font-medium text-xl text-gray-700 hover:text-blue-600"
              >
                Add New Job
              </button>
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
              <button className="p-2 disabled:cursor-not-allowed rounded-full bg-white border hover:bg-gray-100">
                <FiBell size={20} />
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-3 pr-2 py-1 rounded-full hover:bg-gray-100 bg-gray-100"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center overflow-hidden">
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

                  <span className="font-medium text-gray-700">{initials}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border z-50 overflow-hidden">
                    <button
                      onClick={() => handleNavigate("/profile")}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      My Profile
                    </button>

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
          <div className="sm:hidden absolute top-16 right-3 w-60 bg-white rounded-xl shadow-xl border border-gray-200 z-50 p-4 space-y-3">
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
                <button
                  onClick={() => handleNavigate("/dashboard/jobs")}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                >
                  All Jobs
                </button>

                <button
                  onClick={() => handleNavigate("/dashboard/add/job")}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                >
                  Add New Job
                </button>

                <button
                  onClick={() => handleNavigate("/profile")}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                >
                  My Profile
                </button>

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
