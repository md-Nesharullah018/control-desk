
import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, AlertTriangle, ShieldAlert, CheckCircle2 } from "lucide-react";
import { toast } from 'react-toastify';

const DeleteAccount = ({ userEmail }) => {
    const effectiveEmail = (userEmail === "guest@example.com" || !userEmail) 
        ? localStorage.getItem("userEmail") 
        : userEmail;

    const [password, setPassword] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();
        
        const identifier = userEmail && userEmail !== "guest@example.com" 
            ? userEmail 
            : localStorage.getItem("userName");
    
        if (!identifier) {
            return toast.error("Error: User identity not found.");
        }
    
        
        
        setLoading(true);

        toast.promise(
            axios.post('http://localhost:5000/api/auth/delete-account', { 
                email: identifier, 
                password: password 
            }),
            {
                pending: '⚙️ Protocol: Wiping account data...',
                success: {
                    render() {
                        setIsDeleted(true); 
                        setTimeout(() => {
                            localStorage.clear(); 
                            window.location.href = "/register"; 
                        }, 3000);
                        return "Success: Identity purged from system.";
                    }
                },
                error: {
                    render({data}) {
                        setLoading(false);
                        return data.response?.data?.message || "Invalid credentials. Access Denied.";
                    }
                }
            },
            {
                theme: "dark",
                position: "top-center"
            }
        );
    };

    return (
        <div className="relative overflow-hidden p-8 rounded-[2rem] bg-red-500/[0.03] border border-red-500/10 group transition-all duration-500 hover:border-red-500/20 shadow-2xl">
            
            <AnimatePresence>
                {isDeleted && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center text-center p-6"
                    >
                        <motion.div 
                            initial={{ scale: 0.5, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="text-emerald-500 mb-4"
                        >
                            <CheckCircle2 size={60} />
                        </motion.div>
                        <h3 className="text-white text-xl font-bold italic">Identity Deleted</h3>
                        <p className="text-slate-400 text-sm mt-2 font-medium">Redirecting to system entry...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-start gap-5 mb-8 text-left">
                <div className="p-4 bg-red-500/10 rounded-2xl text-red-500">
                    <ShieldAlert size={28} />
                </div>
                <div>
                    <h3 className="text-red-500 font-black text-2xl tracking-tight italic uppercase">Danger Zone</h3>
                    <p className="text-slate-500 text-sm mt-1 font-bold">
                        Target for Deletion: <span className="text-slate-300 font-mono tracking-widest">{effectiveEmail}</span>
                    </p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {!showConfirm ? (
                    <motion.button 
                        key="init-btn"
                        onClick={() => {
                            setShowConfirm(true);
                            // 🔔 Ab browser popup ki jagah sirf ye stylish toast aayega
                            toast.warning(`Warning: Preparing to delete ${effectiveEmail}`, {
                                position: "top-center",
                                theme: "dark"
                            });
                        }}
                        className="w-full md:w-auto px-8 py-3.5 bg-red-600/10 border border-red-600/30 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-500 rounded-2xl font-black text-xs uppercase tracking-[0.2em] italic"
                    >
                        <span className="flex items-center justify-center gap-2"><Trash2 size={16} /> Initiate Deletion</span>
                    </motion.button>
                ) : (
                    <motion.form 
                        key="confirm-form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleDelete} 
                        className="space-y-5 text-left"
                    >
                        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-black uppercase tracking-tighter">
                            <AlertTriangle size={14} /> Critical: Enter password to authorize wipe.
                        </div>
                        
                        <input 
                            type="password" 
                            placeholder="System Access Password" 
                            required
                            className="w-full p-5 bg-slate-950/80 text-white rounded-2xl border border-red-500/20 focus:border-red-500 outline-none transition-all font-bold text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="flex-[2] py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl transition-all disabled:opacity-50 uppercase text-xs tracking-widest italic"
                            >
                                {loading ? "Executing..." : "Confirm Final Deletion"}
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 py-4 bg-slate-900 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest transition-all italic"
                            >
                                Abort
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DeleteAccount;