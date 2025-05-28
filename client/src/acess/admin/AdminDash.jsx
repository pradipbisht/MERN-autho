import { Link, Outlet } from "react-router-dom";
import {
  FaUsers,
  FaCog,
  FaChartBar,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

const navItems = [
  { name: "Dashboard", icon: <FaHome />, to: "/admin" },
  { name: "Users", icon: <FaUsers />, to: "/admin/users" },
  { name: "Analytics", icon: <FaChartBar />, to: "#" },
  { name: "Settings", icon: <FaCog />, to: "#" },
  { name: "Create", icon: <HiOutlineWrenchScrewdriver />, to: "#" },
  { name: "Logout", icon: <FaSignOutAlt />, to: "#" },
];

export default function AdminDash() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="h-20 flex items-center justify-center border-b">
          <span className="text-2xl font-bold text-blue-600">Admin Panel</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 transition">
              <span className="text-xl mr-3">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Default message */}
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          Welcome, Admin!
        </h1>

        {/* Where child routes will render */}
        <Outlet />
      </main>
    </div>
  );
}
