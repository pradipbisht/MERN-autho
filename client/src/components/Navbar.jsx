import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // logic to logout (e.g. dispatch logout action)
    setIsDropdownOpen(false);
    navigate("/sign-in");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white relative">
      <div>
        <Link to="/" className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">MyApp</h2>
        </Link>
      </div>

      <ul className="flex items-center justify-center gap-6">
        <li>
          <Link className="text-2xl font-bold uppercase " to="/">
            Home
          </Link>
        </li>

        {currentUser ? (
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="focus:outline-none">
              <img
                src={
                  currentUser.profilePicture ||
                  "https://xsgames.co/randomusers/avatar.php?g=male"
                }
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                <Link
                  to="/admin"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}>
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}>
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </li>
        ) : (
          <>
            <li>
              <Link to="/sign-in">Login</Link>
            </li>
            <li>
              <Link to="/sign-up">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
