import React, { useRef, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader.jsx";
import { showErrorToast, showSuccessToast } from "../../utils/ToastUtils.jsx";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice.js";
import Button from "../common/Button.jsx";

const UpdateUserAvatar = () => {
  const dispatch = useDispatch();

  const [userAvatar, setUserAvatar] = useState({ avatar: null });
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleFileChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      dispatch(authActions.updateAvatar(res.data.user.avatar));

      showSuccessToast(res.data.message);

      setUserAvatar({ avatar: null });

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || "Failed to update avatar",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50">
          <Loader />
        </div>
      )}

      <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4">
        {/* Hidden file input */}
        <input
          type="file"
          name="avatar"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Avatar Upload */}
        <div
          onClick={() => fileInputRef.current.click()}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed border-gray-300 cursor-pointer flex items-center justify-center hover:border-blue-500 transition mx-auto"
        >
          {userAvatar.avatar ? (
            <img
              src={URL.createObjectURL(userAvatar.avatar)}
              alt="Avatar Preview"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-xs sm:text-sm text-gray-400 text-center">
              Click to
              <br />
              upload
            </span>
          )}
        </div>

        <p className="mt-4 text-center text-xs sm:text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Note:</span> Upload a
          clear image under <span className="font-medium">200 KB</span>
        </p>

        <Button
          onClick={handleSubmit}
          className="mt-5 h-11 w-full sm:w-auto px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-lg hover:scale-105 active:scale-95 duration-200"
        >
          Update Avatar
        </Button>
      </div>
    </>
  );
};

export default UpdateUserAvatar;
