import { useAuth } from "../context/AuthContext";
import { Menu, User } from "lucide-react";

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-20 flex items-center justify-between px-8 fixed top-0 right-0 left-0 lg:left-72 z-10 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Dashboard
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Welcome back, <span className="text-indigo-600 font-semibold">{user?.name}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Administrator</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm transition-transform hover:scale-105">
          <User size={22} strokeWidth={2.5} />
        </div>
      </div>
    </header>
  );
};

export default Header;
