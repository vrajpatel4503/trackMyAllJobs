import React from "react";
import UpdatePassword from "../../components/profile/UpdatePassword.jsx";
import DeleteAccount from "../../components/profile/DeleteAccount.jsx";

const AccountSetting = () => {
  return (
    <div className="px-4 sm:px-6">
      {/* Password Card */}
      <div className="max-w-3xl mx-auto bg-white border rounded-xl p-5 sm:p-6 shadow-sm">
        <h1 className="text-center text-2xl sm:text-3xl font-bold mb-12 sm:mb-10">
          Account Setting
        </h1>

        <UpdatePassword />
      </div>

      {/* Delete Account Section */}
      <div className="max-w-3xl mx-auto mt-6">
        <DeleteAccount />
      </div>
    </div>
  );
};

export default AccountSetting;
