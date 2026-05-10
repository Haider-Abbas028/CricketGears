// Navbar component - site navigation
import { NavLink, useNavigate } from "react-router-dom";
import { FiUser, FiShoppingCart, FiLogOut } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  // Cart count from context
  const { cartCount } = useCart();

  // Active link styling
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-400 scale-110 font-bold underline hover:text-blue-300"
      : "text-white hover:text-blue-300";

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    // Navbar container
    <div className="bg-gray-800 text-white p-4 flex items-center justify-between shadow-lg sticky top-0 z-50">
      {/* Logo */}
      <span>
        <img
          src="/Images/navbarlogo.png"
          alt="Logo"
          className="w-25 h-20 object-contain"
        />
      </span>

      {/* Navigation links */}
      <div className="flex gap-6 bg-gray-900 p-4 rounded-lg shadow-md">
        <NavLink to="/home" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/bats" className={linkClass}>
          Bats
        </NavLink>
        <NavLink to="/balls" className={linkClass}>
          Balls
        </NavLink>
        <NavLink to="/kits" className={linkClass}>
          Kits
        </NavLink>
      </div>

      {/* User actions */}
      <div className="flex items-center gap-4">
        {/* Profile link */}
        <NavLink to="/profile" className="hover:text-blue-400 transition">
          <FiUser size={22} />
        </NavLink>

        {/* Cart with count */}
        <NavLink to="/cart" className="relative hover:text-blue-400 transition">
          <FiShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-400 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </NavLink>

        {/* Signout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition"
        >
          <FiLogOut size={18} />
          <span className="hidden sm:inline">Signout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
