
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import { Mail, ShieldCheck, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
const ChangePassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/request-otp', { email: email.toLowerCase() });
            toast.info("OTP dispatched to your email! 📧"); 
            setStep(2);
        } catch (err) {
            toast.error(err.response?.data?.message || "User not found!");
        } finally { setLoading(false); }
    };


    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/auth/verify-otp', { email: email.toLowerCase(), otp });
            toast.success("Security Clearance Granted! ✅"); // ✅ Toast Notification
            setStep(3);
        } catch (err) {
            toast.error("Invalid Code. Access Denied! ❌");
        } finally { setLoading(false); }
    };

    
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/reset-password', { 
                email: email.toLowerCase(), 
                otp, 
                newPassword 
            });


            toast.success("Password Updated! Security Protocol Completed. 🛡️", {
                position: "top-center",
                autoClose: 2000,
            });


            setTimeout(() => {
                navigate('/login');
            }, 2500);

        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update password!");
        } finally { setLoading(false); }
    };

    return (
        <div className="bg-slate-900 p-8 rounded-[2rem] shadow-2xl max-w-md mx-auto mt-10 border border-slate-800 transition-all duration-500 hover:border-purple-500/30">
       
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-500">
                    {step === 1 && <Mail size={32} />}
                    {step === 2 && <ShieldCheck size={32} />}
                    {step === 3 && <Lock size={32} />}
                </div>
            </div>

            <h2 className="text-white text-2xl font-black mb-6 text-center italic uppercase tracking-tight">
                {step === 1 && "Access Recovery"}
                {step === 2 && "OTP Validation"}
                {step === 3 && "Secure Reset"}
            </h2>

     
            {step === 1 && (
                <form onSubmit={handleRequestOtp} className="space-y-4">
                    <input type="email" placeholder="Email Address" required className="w-full p-4 bg-slate-950/50 text-white rounded-2xl border border-slate-700" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit" disabled={loading} className="w-full py-4 bg-purple-600 text-white font-black rounded-2xl transition hover:bg-purple-700 uppercase italic">
                        {loading ? "Transmitting..." : "Send OTP"}
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <input type="text" placeholder="6-DIGIT CODE" required className="w-full p-4 bg-slate-950/50 text-white rounded-2xl border border-slate-700 text-center tracking-widest text-2xl font-black" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <button type="submit" disabled={loading} className="w-full py-4 bg-purple-600 text-white font-black rounded-2xl uppercase italic">
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                    <button type="button" onClick={() => setStep(1)} className="w-full text-slate-500 text-xs font-bold hover:text-white uppercase">Change Email</button>
                </form>
            )}

            {step === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <input type="password" placeholder="New Secure Password" required minLength={6} className="w-full p-4 bg-slate-950/50 text-white rounded-2xl border border-slate-700" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <button type="submit" disabled={loading} className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl transition uppercase italic shadow-lg shadow-green-600/20">
                        {loading ? "Wiping Old Pass..." : "Establish New Key"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ChangePassword;