import { FaLock } from "react-icons/fa";

export default function Unauthorised() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="bg-white rounded-xl shadow-2xl p-10 flex flex-col items-center animate-fade-in-up">
        <FaLock className="text-6xl text-purple-600 mb-4 animate-bounce" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6 text-center">
          You do not have permission to view this page.
        </p>
        <a
          href="/"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-colors duration-200">
          Go Home
        </a>
      </div>
      <style>
        {`
          .animate-fade-in-up {
            animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1);
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
