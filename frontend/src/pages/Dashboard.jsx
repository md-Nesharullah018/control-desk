

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import ProfileView from "../components/ProfileView";

// Task components imported from your new folder
import TaskCard from "../task/TaskCard";
import TaskTabs from "../task/TaskTabs";
import TaskModal from "../task/TaskModal";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, ListTodo, CheckCircle2, Zap, Search } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [taskFilter, setTaskFilter] = useState("All");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const root = window.document.documentElement;
    darkMode ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("myTasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { localStorage.setItem("myTasks", JSON.stringify(tasks)); }, [tasks]);

  const handleAddTask = (data) => {
    const newTask = { ...data, id: Date.now(), done: false };
    setTasks([newTask, ...tasks]);
    setModalOpen(false);
    toast.success("Task added to your workspace!");
    setActiveTab("Tasks");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    const task = tasks.find(t => t.id === id);
    if (task && !task.done) toast.success("Excellent! Task completed.");
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (t.desc && t.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Status Logic for Tabs
    let matchesStatus = true;
    if (taskFilter === "Pending") matchesStatus = !t.done;
    if (taskFilter === "Completed") matchesStatus = t.done;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 overflow-hidden font-sans relative">
      <Toaster position="top-right" />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden z-10">
        <Navbar 
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
          userName={localStorage.getItem("userName") || "User"} 
          darkMode={darkMode} 
          setDarkMode={() => setDarkMode(!darkMode)} 
          onLogout={() => {localStorage.clear(); navigate("/login");}} 
        />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-12 no-scrollbar">
          <AnimatePresence mode="wait">
            
            {activeTab === "Overview" && (
              <motion.div key="ov" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 text-left">
                <div>
                  <h1 className="text-5xl font-black italic tracking-tight">Executive Summary</h1>
                  <p className="text-slate-500 font-medium mt-2">Welcome back to your control center.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <StatsCard title="Total Tasks" value={tasks.length} icon={<ListTodo size={22}/>} color="indigo" />
                  <StatsCard title="Completed" value={tasks.filter(t=>t.done).length} icon={<CheckCircle2 size={22}/>} color="emerald" />
                  <StatsCard title="Pending" value={tasks.filter(t=>!t.done).length} icon={<Zap size={22}/>} color="amber" />
                </div>

                <div onClick={() => setModalOpen(true)} className="bg-white dark:bg-slate-900/40 p-8 rounded-[3rem] border border-dashed border-slate-300 dark:border-slate-800 cursor-pointer hover:border-indigo-500 transition-all group">
                   <h3 className="text-xl font-bold text-slate-400 group-hover:text-indigo-500 flex items-center gap-2">
                     <Plus size={18}/> Create a new task workflow...
                   </h3>
                </div>
              </motion.div>
            )}

            {activeTab === "Tasks" && (
              <motion.div key="myt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto w-full text-left">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                  <h1 className="text-4xl font-black italic tracking-tight">Workspace</h1>
                  <div className="relative w-full md:w-72 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search tasks..." 
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-12 pr-4 py-3 rounded-2xl outline-none focus:ring-2 ring-indigo-500/50" 
                      onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                  </div>
                </div>

                {/* Categories Tab Component */}
                <TaskTabs currentFilter={taskFilter} setFilter={setTaskFilter} />

                <div className="grid gap-6">
                  {filteredTasks.length > 0 ? filteredTasks.map(t => (
                    <TaskCard 
                      key={t.id} 
                      task={t} 
                      onToggle={toggleTask} 
                      onDelete={(id) => {setTasks(tasks.filter(x => x.id !== id)); toast.error("Task deleted.");}} 
                    />
                  )) : (
                    <div className="py-24 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3.5rem] text-slate-500 italic">
                      No tasks found in this view.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "Profile" && <ProfileView />}

          </AnimatePresence>
        </main>
      </div>
      
      {/* Reusable Modal Component */}
      <TaskModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onAdd={handleAddTask} />
    </div>
  );
}