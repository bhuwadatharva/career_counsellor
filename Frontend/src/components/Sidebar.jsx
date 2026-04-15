import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineDashboard, MdOutlineQuiz, MdShowChart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { IoGitBranchOutline, IoTrophyOutline } from "react-icons/io5";
import { useAuth } from "../AuthContext";

export const Sidebar = ({ onLinkClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const baseClasses =
    "p-3 flex items-center gap-3 text-[15px] rounded-md font-medium transition-all";
  const activeClass = "bg-indigo-100 text-indigo-600 shadow-sm";
  const inactiveClass =
    "text-slate-600 hover:bg-slate-100 hover:text-slate-800";

  const handleClick = () => onLinkClick && onLinkClick();

  const handleLogout = () => {
    // ✅ Remove all user-related data from localStorage
    localStorage.removeItem("userProfile");
    localStorage.removeItem("domain");
    localStorage.removeItem("token");
    localStorage.clear(); // optional complete wipe

    // ✅ Redirect to login
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full py-4 select-none justify-between">
      <nav className="flex flex-col space-y-1 text-[15px]">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClass : inactiveClass}`
          }
          onClick={handleClick}
        >
          <MdOutlineDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/performance"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClass : inactiveClass}`
          }
          onClick={handleClick}
        >
          <MdShowChart size={18} />
          Performance
        </NavLink>

        <NavLink
          to="/roadmap"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClass : inactiveClass}`
          }
          onClick={handleClick}
        >
          <IoGitBranchOutline size={18} />
          Roadmap
        </NavLink>

        <NavLink
          to="/test"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClass : inactiveClass}`
          }
          onClick={handleClick}
        >
          <MdOutlineQuiz size={18} />
          Test
        </NavLink>

        <NavLink
          to="/achievements"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClass : inactiveClass}`
          }
          onClick={handleClick}
        >
          <IoTrophyOutline size={18} />
          Achievements
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClass : inactiveClass}`
          }
          onClick={handleClick}
        >
          <CgProfile size={18} />
          Profile
        </NavLink>
      </nav>

      {/* ✅ Logout Button */}
      <button
        onClick={logout}
        className="w-full flex items-center gap-2 mt-2 px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-100 transition"
      >
        <FiLogOut size={18} />
        Logout
      </button>
    </div>
  );
};
