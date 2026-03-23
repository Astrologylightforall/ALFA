"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect to admin dashboard
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 bg-primary-bg relative flex justify-center items-center">
      {/* Dynamic Backgrounds */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-gold-primary/5 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0A0D0E] rounded-full filter blur-[100px] opacity-[0.5] -z-10 pointer-events-none" />

      <div className="w-full max-w-md px-4 relative z-10">
        <div className="bg-surface/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/10 rounded-full filter blur-[40px] pointer-events-none transition-opacity duration-1000 group-hover:opacity-100 opacity-30" />

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#111617] rounded-2xl mx-auto flex items-center justify-center border border-gold-primary/30 mb-4 shadow-[0_0_30px_rgba(201,168,76,0.1)]">
              <ShieldCheck size={32} className="text-gold-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white tracking-tight">System Access</h1>
            <p className="font-body text-cream/50 text-xs mt-2 font-mono uppercase tracking-widest">
              ALFA Secure Administrator Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-lg text-center animate-pulse">
                {error}
              </div>
            )}

            <div className="relative group/input">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gold-primary mb-2 font-bold ml-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={16} className="text-cream/40 group-focus-within/input:text-gold-primary transition-colors" />
                </div>
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter administrator ID"
                  className="w-full bg-[#111617]/80 backdrop-blur-md border border-white/10 rounded-xl pl-11 pr-5 py-4 text-white placeholder-cream/20 focus:outline-none focus:border-gold-primary/60 transition-all duration-300 text-sm shadow-inner"
                />
              </div>
            </div>

            <div className="relative group/input">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gold-primary mb-2 font-bold ml-1">Passphrase</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={16} className="text-cream/40 group-focus-within/input:text-gold-primary transition-colors" />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#111617]/80 backdrop-blur-md border border-white/10 rounded-xl pl-11 pr-5 py-4 text-white placeholder-cream/20 focus:outline-none focus:border-gold-primary/60 transition-all duration-300 text-sm shadow-inner font-mono tracking-widest"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full relative overflow-hidden group/btn bg-gradient-to-r from-gold-primary via-[#F5E1A4] to-gold-primary text-black font-display font-bold px-8 py-4 rounded-xl shadow-[0_10px_30px_rgba(201,168,76,0.2)] hover:shadow-[0_15px_40px_rgba(201,168,76,0.4)] transition-all duration-500 bg-[length:200%_auto] hover:bg-right disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover/btn:animate-shine" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? "Authenticating..." : "Establish Connection"}
              </span>
            </button>
          </form>

        </div>
      </div>
    </main>
  );
}
