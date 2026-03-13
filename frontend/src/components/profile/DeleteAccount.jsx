import React from "react";

const DeleteAccount = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 sm:mt-14 bg-white shadow-lg rounded-xl p-5 sm:p-6 border border-red-200">

      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-semibold text-red-600 mb-3">
        Delete Account
      </h2>

      {/* Warning Message */}
      <p className="text-sm sm:text-base text-gray-600 mb-4">
        This action is permanent and cannot be undone. Deleting your account
        will remove all your data, profile information, and settings.
      </p>

      {/* Warning Box */}
      <div className="bg-red-50 border border-red-300 rounded-md p-4 mb-5">
        <p className="text-sm text-red-700 font-medium">
          ⚠ Please confirm that you want to permanently delete your account.
        </p>
      </div>

      {/* Confirmation Input */}
      <input
        type="text"
        placeholder="Type DELETE to confirm"
        className="w-full border rounded-md h-11 sm:h-12 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
      />

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="w-full sm:flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2.5 rounded-md transition">
          Cancel
        </button>

        <button className="w-full sm:flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-md transition">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;