import { Trash2, CheckCircle2, AlignLeft, Calendar } from "lucide-react";

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-[2.5rem] flex flex-col group hover:border-indigo-500/30 transition-all shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div 
            onClick={() => onToggle(task.id)} 
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${task.done ? "bg-emerald-500 border-emerald-500 shadow-lg" : "border-slate-300 dark:border-slate-700"}`}
          >
            {task.done && <CheckCircle2 size={18} className="text-white" />}
          </div>
          <h4 className={`text-xl font-bold ${task.done ? "line-through text-slate-400" : "text-slate-800 dark:text-white"}`}>{task.title}</h4>
        </div>
        <button onClick={() => onDelete(task.id)} className="text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl">
          <Trash2 size={20}/>
        </button>
      </div>

      <div className="mt-4 pl-12 text-left">
        {task.desc && (
          <p className={`text-sm mb-4 leading-relaxed flex items-start gap-2 ${task.done ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
            <AlignLeft size={14} className="mt-1 shrink-0 opacity-50" />
            {task.desc}
          </p>
        )}
        <div className="flex gap-4">
           <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase border ${task.priority === 'High' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'}`}>
             {task.priority} Priority
           </span>
           <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full font-bold flex items-center gap-1 uppercase tracking-tighter">
             <Calendar size={12}/> {task.date || 'No Date'}
           </span>
        </div>
      </div>
    </div>
  );
}