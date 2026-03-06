import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

export default function TaskModal({ isOpen, onClose, onAdd }) {
  const [taskData, setTaskData] = useState({ title: '', desc: '', priority: 'Medium', date: '' });
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 text-left">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-lg bg-white dark:bg-[#0f172a] p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-red-500 transition-colors"><X size={24} /></button>
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-indigo-600 dark:text-white mb-2 italic">New Task Workflow</h2>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Title</label>
            <input type="text" placeholder="Task Title" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl mt-1 text-slate-900 dark:text-white outline-none focus:ring-2 ring-indigo-500" onChange={(e) => setTaskData({...taskData, title: e.target.value})} />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Description</label>
            <textarea placeholder="Add details..." className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl mt-1 h-24 text-slate-900 dark:text-white outline-none focus:ring-2 ring-indigo-500 resize-none" onChange={(e) => setTaskData({...taskData, desc: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Priority</label>
              <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl mt-1 text-slate-900 dark:text-white outline-none" value={taskData.priority} onChange={(e) => setTaskData({...taskData, priority: e.target.value})}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Due Date</label>
              <input type="date" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl mt-1 text-slate-900 dark:text-white outline-none" onChange={(e) => setTaskData({...taskData, date: e.target.value})} />
            </div>
          </div>
          <button onClick={() => { if(taskData.title) onAdd(taskData); }} className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl font-black text-white text-lg mt-2 transition-all active:scale-95 shadow-xl">Create Task</button>
        </div>
      </motion.div>
    </div>
  );
}