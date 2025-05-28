import React from "react";

const UserDash = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          User Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to your dashboard! Here you can view your profile and manage
          your account.
        </p>
        <div className="flex flex-col gap-4">
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            View Profile
          </button>
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
            Edit Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDash;
