import { LayoutGrid, Clock, CheckCircle } from "lucide-react";

export default function TaskTabs({ currentFilter, setFilter }) {
  const tabs = [
    { id: 'All', icon: <LayoutGrid size={16}/>, label: 'All Tasks' },
    { id: 'Pending', icon: <Clock size={16}/>, label: 'In Progress' },
    { id: 'Completed', icon: <CheckCircle size={16}/>, label: 'Completed' }
  ];

  return (
    <div className="flex bg-slate-200/50 dark:bg-slate-900/50 p-1.5 rounded-[2rem] mb-10 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setFilter(tab.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-black transition-all ${
            currentFilter === tab.id 
            ? "bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-md" 
            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  );
}