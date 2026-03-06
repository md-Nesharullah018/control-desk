import { motion } from "framer-motion";

export default function StatsCard({ title, value, trend, icon, color }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2.5rem] flex flex-col justify-between h-44 relative overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-20 bg-${color}-500 transition-all group-hover:opacity-40`}></div>
      
      <div className="flex justify-between items-start">
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-2xl">
          {icon}
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400`}>
          {trend}
        </span>
      </div>

      <div>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-tighter mb-1">{title}</p>
        <h3 className="text-3xl font-black text-white">{value}</h3>
      </div>
    </motion.div>
  );
}


