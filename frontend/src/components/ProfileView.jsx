

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { User, ShieldCheck, Trash2, LogOut, ChevronRight, Mail, LayoutDashboard, Fingerprint, Activity } from "lucide-react";
import ChangePassword from "../pages/ChangePassword"; 
import DeleteAccount from "../pages/DeleteAccount";

export default function ProfileView({ user }) {
  const [activeTab, setActiveTab] = useState('profile');

  const [localUser, setLocalUser] = useState({
    name: user?.name || localStorage.getItem("userName") || "Guest User",
    email: user?.email || localStorage.getItem("userEmail") || "No Email Found"
  });

  useEffect(() => {
    if (user?.name || user?.email) {
      setLocalUser({
        name: user.name || localStorage.getItem("userName"),
        email: user.email || localStorage.getItem("userEmail")
      });
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.clear(); 
    window.location.href = "/login";
  };

  const menuItems = [
    { id: 'profile', label: 'Overview', icon: <LayoutDashboard size={18} />, color: 'from-blue-500 to-indigo-600' },
    { id: 'security', label: 'Security', icon: <Fingerprint size={18} />, color: 'from-emerald-500 to-teal-600' },
    { id: 'danger', label: 'Danger Zone', icon: <Trash2 size={18} />, color: 'from-red-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen text-slate-300 p-4 md:p-8 font-sans overflow-x-hidden no-scrollbar selection:bg-indigo-500/30">
      

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        
        <aside className="lg:col-span-3 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/40 border border-slate-800/60 backdrop-blur-2xl p-6 rounded-[2.5rem] shadow-2xl sticky top-8"
          >
            <div className="flex flex-col items-center text-center pb-8 border-b border-slate-800/50">
              <div className="relative group mb-4">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse"></div>
                <div className="relative w-20 h-20 rounded-full bg-slate-950 flex items-center justify-center text-3xl font-black text-white border border-slate-800 uppercase ring-4 ring-slate-900/50">
                  {localUser.name[0]}
                </div>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight leading-tight">{localUser.name}</h2>
              <p className="text-slate-500 text-[11px] font-medium flex items-center gap-1.5 mt-1 bg-slate-800/30 px-3 py-1 rounded-full border border-slate-800/50">
                <Mail size={10} className="text-indigo-400" /> {localUser.email}
              </p>
            </div>

            <nav className="mt-8 space-y-1.5">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                    activeTab === item.id 
                    ? 'text-white translate-x-1' 
                    : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/30'
                  }`}
                >
                  {activeTab === item.id && (
                    <motion.div layoutId="activeBG" className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-10`} />
                  )}
                  <div className="flex items-center gap-3 relative z-10">
                    <span className={`p-2 rounded-xl transition-colors ${activeTab === item.id ? 'bg-white/10 text-white' : 'group-hover:text-indigo-400'}`}>
                      {item.icon}
                    </span>
                    <span className="font-bold text-sm tracking-wide">{item.label}</span>
                  </div>
                </button>
              ))}
            </nav>

            <button onClick={handleLogout} className="w-full mt-10 flex items-center justify-center gap-2 p-4 text-red-500/80 font-black text-[11px] uppercase tracking-widest hover:bg-red-500/10 rounded-2xl transition-all border border-red-500/10 group">
              <LogOut size={14} /> Sign Out
            </button>
          </motion.div>
        </aside>

        <main className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-slate-900/20 border border-slate-800/40 backdrop-blur-3xl rounded-[3rem] p-6 md:p-10 min-h-[600px] relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800/40">
                <h3 className="text-4xl font-black text-white tracking-tighter capitalize">{activeTab}</h3>
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/5 border border-indigo-500/10 rounded-full">
                    <Activity size={14} className="text-indigo-500 animate-pulse" />
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">Secure Link Active</span>
                </div>
              </div>

              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-8 bg-gradient-to-br from-slate-900/60 to-slate-900/20 rounded-[2.5rem] border border-slate-800/50 group">
                      <div className="flex items-center gap-4 mb-4 text-indigo-400">
                        <User size={20}/>
                        <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Official Name</p>
                      </div>
                      <p className="text-2xl font-bold text-white">{localUser.name}</p>
                    </div>

                    <div className="p-8 bg-gradient-to-br from-slate-900/60 to-slate-900/20 rounded-[2.5rem] border border-slate-800/50 group">
                      <div className="flex items-center gap-4 mb-4 text-emerald-400">
                        <Mail size={20}/>
                        <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Contact Email</p>
                      </div>
                      <p className="text-2xl font-bold text-white">{localUser.email}</p>
                    </div>
                  </div>

                  <div className="relative p-10 rounded-[2.5rem] border border-slate-800 bg-slate-950/40">
                    <h4 className="text-xl font-bold text-white mb-3">System Insight</h4>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                        Hey {localUser.name.split(' ')[0]}, your account is currently synchronized. Everything looks good!
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'security' && <ChangePassword userEmail={localUser.email} />}
              {activeTab === 'danger' && <DeleteAccount userEmail={localUser.email} />}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}