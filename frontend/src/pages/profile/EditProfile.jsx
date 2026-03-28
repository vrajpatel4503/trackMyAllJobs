import React from "react";
import UpdateEmail from "../../components/profile/UpdateEmail";
import UpdatePhoneNumber from "../../components/profile/UpdatePhoneNumber";
import UpdateUserAvatar from "../../components/profile/UpdateUserAvatar";

const EditProfile = () => {
  return (
    <div className="w-full px-4 py-4 flex justify-center">
      <div className="w-full max-w-2xl bg-white border rounded-xl shadow-sm p-6 sm:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Edit Profile
        </h1>

        {/* Avatar */}
        <UpdateUserAvatar />

        <div className="border-t my-8"></div>

        {/* Email */}
        <UpdateEmail />

        <div className="border-t my-8"></div>

        {/* Phone */}
        <UpdatePhoneNumber />

      </div>
    </div>
  );
};

export default EditProfile;