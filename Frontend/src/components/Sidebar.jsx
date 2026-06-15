import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Wallet, TrendingUp, TrendingDown, PieChart, Settings, LogOut, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  const links = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Incomes", path: "/income", icon: <TrendingUp size={20} /> },
    { name: "Expenses", path: "/expenses", icon: <TrendingDown size={20} /> },
    { name: "Reports", path: "/reports", icon: <PieChart size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-[#0F172A] text-white shadow-2xl transform transition-transform duration-300 ease-in-out border-r border-slate-800
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-800">
          <div className="flex items-center gap-3 font-bold text-2xl tracking-tight">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
              <Wallet className="text-white" size={24} />
            </div>
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Expensy
            </span>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-8 px-4">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-4 px-4">
            Main Menu
          </div>
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => onClose()}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    pathname === link.path
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                  }`}
                >
                  <span className={`${pathname === link.path ? "text-white" : "text-slate-500 group-hover:text-slate-300"} transition-colors`}>
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-slate-800/40 rounded-2xl p-4 mb-6 border border-slate-700/50">
            <p className="text-xs text-slate-500 mb-1">Signed in as</p>
            <p className="text-sm font-medium text-slate-200 truncate">{useAuth().user?.name || "User"}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 rounded-xl transition-all duration-200 group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
