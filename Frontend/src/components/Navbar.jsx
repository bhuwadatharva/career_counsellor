import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-sm border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold text-emerald-900">CareerPath</div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 items-center text-slate-600 font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-700 border-b-2 border-emerald-500 pb-1"
                  : "hover:text-emerald-600 transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/main"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-700 border-b-2 border-emerald-500 pb-1"
                  : "hover:text-emerald-600 transition"
              }
            >
              Tools
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-700 border-b-2 border-emerald-500 pb-1"
                  : "hover:text-emerald-600 transition"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-700 border-b-2 border-emerald-500 pb-1"
                  : "hover:text-emerald-600 transition"
              }
            >
              Pricing
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-700 border-b-2 border-emerald-500 pb-1"
                  : "hover:text-emerald-600 transition"
              }
            >
              Contact
            </NavLink>
          </ul>

          {/* Login Button */}
          <div className="hidden md:block">
            <NavLink
              to="/login"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              Login
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-slate-600 focus:outline-none"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-emerald-100">
          <ul className="flex flex-col gap-4 p-4 text-slate-600 font-medium">
            <NavLink
              to="/"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-700 border-b-2 border-emerald-500 pb-1"
                  : "hover:text-emerald-600 transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/main"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-700 border-b-2 border-emerald-500 pb-1"
                  : "hover:text-emerald-600 transition"
              }
            >
              Tools
            </NavLink>
            <NavLink
              to="/about"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-700 border-b-2 border-emerald-500 pb-1"
                  : "hover:text-emerald-600 transition"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/pricing"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-700 border-b-2 border-emerald-500 pb-1"
                  : "hover:text-emerald-600 transition"
              }
            >
              Pricing
            </NavLink>
            <NavLink
              to="/contact"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-700 border-b-2 border-emerald-500 pb-1"
                  : "hover:text-emerald-600 transition"
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/login"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-center"
            >
              Login
            </NavLink>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
