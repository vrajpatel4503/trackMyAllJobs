import React from "react";
import UpdateEmail from "../../components/profile/UpdateEmail";
import UpdatePhoneNumber from "../../components/profile/UpdatePhoneNumber";
import UpdateUserAvatar from "../../components/profile/UpdateUserAvatar";

const EditProfile = () => {
  return (
    <div className="w-full px-4 sm:px-6 mt-5">
      <div className="border p-5 sm:p-6 bg-white rounded-xl max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Edit Profile
        </h1>

        <UpdateUserAvatar />

        <UpdateEmail />

        <UpdatePhoneNumber />
      </div>
    </div>
  );
};

export default EditProfile;