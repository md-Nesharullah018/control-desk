import { motion } from "framer-motion";

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const menus = [
    { id: "Overview", icon: "📊", label: "Dashboard" },
    { id: "Tasks", icon: "✅", label: "My Tasks" },
    { id: "Profile", icon: "👤", label: "Account" },

  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isOpen ? 260 : 80 }}
      className="h-screen bg-[#0f172a] border-r border-slate-800 flex flex-col sticky top-0 z-50 shadow-2xl"
    >
      <div className="p-6 mb-4 flex items-center gap-3 font-black text-xl text-indigo-500 overflow-hidden whitespace-nowrap">
        <div className="min-w-[40px] h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
          CD
        </div>
        {isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>ControlDesk</motion.span>}
      </div>

      <nav className="flex-1 px-3 space-y-2">
        {menus.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${
              activeTab === item.id 
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && <span className="font-bold">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={() => { localStorage.clear(); window.location.reload(); }}
          className="w-full p-3 rounded-xl text-red-400 hover:bg-red-500/10 flex items-center gap-4 transition-all"
        >
          <span className="text-xl">🚪</span>
          {isOpen && <span className="font-bold">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}