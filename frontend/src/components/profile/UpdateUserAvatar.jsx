import React, { useRef, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader.jsx";
import { showErrorToast, showSuccessToast } from "../../utils/ToastUtils.jsx";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice.js";
import Button from "../common/Button.jsx";

const UpdateUserAvatar = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, isDemo } = useSelector((state) => state.auth);

  const [userAvatar, setUserAvatar] = useState({ avatar: null });
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Handle file selection
  const handleFileChange = (e) => {
    if (isDemo) {
      showErrorToast("Uploading avatar is disabled in demo mode");
      return;
    }

    const { files } = e.target;
    if (!files || !files[0]) return;

    const file = files[0];

    if (file.size > 200 * 1024) {
      showErrorToast("Avatar must be under 200 KB.");
      setUserAvatar({ avatar: null });

      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setUserAvatar({ avatar: file });
  };

  // Handle submit
  const handleSubmit = async () => {
    if (isDemo) {
      showErrorToast("Updating avatar is not allowed in demo mode");
      return;
    }

    if (!userAvatar.avatar) {
      showErrorToast("Please select an avatar first");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", userAvatar.avatar);

      const res = await axios.put(
        `${API_URL}/api/v1/user/update/avatar`,
        formData,
        { withCredentials: true },
      );

      dispatch(authActions.updateAvatar(res.data?.avatar?.avatar?.url));

      showSuccessToast(res.data?.message || "Avatar updated successfully");

      setUserAvatar({ avatar: null });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || "Failed to update avatar",
      );

      setUserAvatar({ avatar: null });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50">
          <Loader />
        </div>
      )}

      <div className="flex flex-col items-center text-center">
        <h2 className="text-lg font-semibold mb-5">Update Profile Picture</h2>

        {/* Hidden file input */}
        <input
          type="file"
          name="avatar"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Avatar Upload Box */}
        <div
          onClick={() => {
            if (isDemo) {
              showErrorToast("Uploading avatar is not allowed in demo mode");
              return;
            }
            fileInputRef.current.click();
          }}
          className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed flex items-center justify-center transition ${
            isDemo
              ? "cursor-not-allowed opacity-50 border-gray-300"
              : "cursor-pointer hover:border-blue-500 border-gray-300"
          }`}
        >
          {userAvatar.avatar ? (
            <img
              src={URL.createObjectURL(userAvatar.avatar)}
              alt="Avatar Preview"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray-400 text-center">
              Click to upload
            </span>
          )}
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Upload image under <span className="font-medium">200KB</span>
        </p>

        {/* Update Button */}
        {isLoggedIn && (
          <Button
            onClick={handleSubmit}
            className={`mt-5 h-11 px-6 rounded-lg transition ${
              isDemo
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Update Avatar
          </Button>
        )}
      </div>
    </>
  );
};

export default UpdateUserAvatar;
