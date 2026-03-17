import React from "react";
import UpdatePassword from "../../components/profile/UpdatePassword.jsx";
import DeleteAccount from "../../components/profile/DeleteAccount.jsx";

const AccountSetting = () => {
  return (
    <div className="w-full flex justify-center px-4 py-6">

      <div className="w-full max-w-2xl bg-white border rounded-xl shadow-sm p-6 sm:p-8">

        <h1 className="text-center text-2xl sm:text-3xl font-bold mb-8">
          Account Settings
        </h1>

        <UpdatePassword />

        <div className="border-t my-8"></div>

        <DeleteAccount />

      </div>

    </div>
  );
};

export default AccountSetting;