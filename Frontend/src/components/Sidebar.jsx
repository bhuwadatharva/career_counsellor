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
    "px-4 py-3 flex items-center gap-3 text-[15px] rounded border border-transparent font-medium transition-all duration-300";
  const activeClass = "bg-black text-white shadow font-semibold";
  const inactiveClass =
    "text-gray-400 hover:bg-[#1a1a1a] hover:text-white hover:border-[#444]";

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
    <div className="flex flex-col h-full py-4 select-none justify-between h-full">
      <nav className="flex flex-col space-y-2 mt-2 text-[15px] px-2">
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
      <div className="px-2 mt-4">
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-4 py-3 text-[15px] font-medium text-white border border-neutral-800 rounded hover:bg-black hover:text-white transition-all duration-300"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};
