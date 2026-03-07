

import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react"; 

import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    if (e) e.preventDefault();
    if (!form.email || !form.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);
      
      // const res = await axios.post("https://control-desk-backend.vercel.app/api/auth/login", form);

      const res = await axios.post("http://localhost:5000/api/auth/login", form);
    
      localStorage.setItem("userName", res.data.name || "User");
      localStorage.setItem("userEmail", form.email); 
      

      toast.success(`Welcome back, ${res.data.name || 'User'}!`);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {

      const errMsg = err.response?.data?.message || "Login failed. Check credentials.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c] text-white p-4 relative overflow-hidden font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md z-10">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl text-left">
          <h1 className="text-4xl font-black text-center mb-2 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent italic tracking-tighter">Welcome</h1>
          <p className="text-center text-gray-400 mb-10 font-medium italic">Sign in to your account</p>

          <form onSubmit={login} className="space-y-6">
            <div className="relative group">
              <label className="text-[10px] font-black uppercase text-gray-500 ml-1 mb-1 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900/50 border border-white/10 focus:border-indigo-500 outline-none transition-all text-sm font-bold"
                  placeholder="Enter your email"
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="relative group">
              <label className="text-[10px] font-black uppercase text-gray-500 ml-1 mb-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  type="password"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900/50 border border-white/10 focus:border-indigo-500 outline-none transition-all text-sm font-bold"
                  placeholder="Enter your password"
                  required
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-indigo-600/30 uppercase tracking-widest italic">
              {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight className="w-5 h-5"/></>}
            </button>
          </form>

          <p className="mt-10 text-center text-gray-500 font-medium">
          Don't have an account? <Link to="/register" className="text-indigo-400 font-bold ml-1 hover:underline underline-offset-4">Create Account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}