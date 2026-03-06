
import { Sun, Moon, Menu, LogOut } from "lucide-react";

export default function Navbar({ toggleSidebar, userName, darkMode, setDarkMode, onLogout }) {
  return (
    <nav className="p-4 md:px-10 flex justify-between items-center bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg dark:text-white">
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
  
        <button 
          onClick={setDarkMode}
          className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-yellow-400 transition-all hover:scale-110 active:scale-90"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>

        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-500/10 px-4 py-2 rounded-xl transition-all"
        >
          <LogOut size={18} />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </nav>
  );
}