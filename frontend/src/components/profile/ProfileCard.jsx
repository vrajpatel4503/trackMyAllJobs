import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../utils/ToastUtils";
import Loader from "../common/Loader";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API_URL;

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

const ProfileCard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { fullName } = useSelector((state) => state.auth);

  const initials = getInitials(fullName);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/v1/user/user/details`, {
          withCredentials: true,
        });

        setData(res.data.user);
      } catch (error) {
        showErrorToast(
          error.response?.data?.message ||
            "Failed to fetch profile. Please try again",
        );
        navigate("/profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  if (loading)
    return (
      <div className="w-full flex justify-center items-start py-8 px-4 my-12 md:my-14">
        <div className="border border-gray-300 rounded-xl w-full sm:w-96 max-w-lg p-6 shadow-sm bg-white flex items-center justify-center min-h-130">
          <Loader />
        </div>
      </div>
    );

  if (!data)
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-lg">Failed to load profile.</p>
      </div>
    );

  return (
    <>
      <div className="w-full flex justify-center items-start py-8 px-4 my-4 md:my-14">
        <div className="border border-gray-300 rounded-xl w-full sm:w-96 max-w-lg p-6 shadow-sm bg-white">
          <h1 className="text-2xl font-bold text-center mb-6">My Profile</h1>

          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border flex items-center justify-center font-semibold text-white overflow-hidden ${
                data.avatar?.url ? "" : "bg-blue-600 text-2xl"
              }`}
            >
              {data.avatar?.url ? (
                <img
                  src={data.avatar.url}
                  alt="user avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
          </div>

          <div className="space-y-4 text-base sm:text-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <strong>Full Name:</strong>
              <span>{data.fullName}</span>
            </div>
            <hr />

            <div className="flex flex-col sm:flex-row sm:justify-between">
              <strong>Email:</strong>
              <span className="break-all">{data.email}</span>
            </div>
            <hr />

            <div className="flex flex-col sm:flex-row sm:justify-between">
              <strong>Phone Number:</strong>
              <span>{data.phoneNumber}</span>
            </div>
            <hr />

            <div className="flex flex-col sm:flex-row sm:justify-between">
              <strong>Joined At:</strong>
              <span>
                {new Date(data.joinedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <hr />

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <strong>Status:</strong>
              <span
                className={`mt-1 sm:mt-0 px-2 py-1 rounded-full text-white ${
                  data.isOnline ? "bg-green-400 text-center sm:text-right" : "bg-red-400"
                }`}
              >
                {data.isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
