import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

const ManagerDash = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-700 text-white p-6 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaClipboardList className="inline-block" />
          Manager Dashboard
        </h1>
        <Link
          to="/logout"
          className="flex items-center gap-2 bg-blue-900 px-4 py-2 rounded hover:bg-blue-800 transition">
          <FaSignOutAlt />
          Logout
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mt-12">
          <Link
            to="/manager/users"
            className="bg-white rounded-lg shadow p-8 flex flex-col items-center hover:bg-blue-50 transition">
            <FaUsers className="text-4xl text-blue-700 mb-4" />
            <span className="text-lg font-semibold">Manage Users</span>
          </Link>
          <Link
            to="/manager/reports"
            className="bg-white rounded-lg shadow p-8 flex flex-col items-center hover:bg-blue-50 transition">
            <FaClipboardList className="text-4xl text-blue-700 mb-4" />
            <span className="text-lg font-semibold">View Reports</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ManagerDash;
