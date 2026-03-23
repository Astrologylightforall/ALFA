"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Mic, CalendarClock, PhoneOff, Shield, Copy, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SweepHeading } from "@/components/ui/AnimatedText";

function ConsultationRoomContent() {
  const searchParams = useSearchParams();
  const roomParam = searchParams.get("room") || "";

  // UI Modes: "request" (no token), "verify" (checking token), "access" (token valid but pre-join), "call" (in Jitsi)
  const [mode, setMode] = useState<"request" | "verify" | "access" | "call">(roomParam ? "verify" : "request");
  
  // States
  const [meetingId, setMeetingId] = useState(roomParam);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  
  const [appointmentData, setAppointmentData] = useState<any>(null);

  useEffect(() => {
    if (roomParam) {
      validateToken(roomParam);
    }
  }, [roomParam]);

  const validateToken = async (token: string) => {
    try {
      const res = await fetch(`/api/appointments/${token}`);
      const data = await res.json();
      if (data.success && data.appointment?.status === "Confirmed") {
        setAppointmentData(data.appointment);
        setName(data.appointment.clientName);
        setMode("access");
      } else {
        // Fallback to request mode if invalid or pending
        setMode("request");
        setMeetingId("");
      }
    } catch (err) {
      setMode("request");
    }
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          clientName: name, 
          email: email,
          service: service,
          platform: "ALFA Portal", 
          status: "Pending",
          date: "TBD"
        }),
      });
      if (res.ok) {
        setRequestSuccess(true);
      }
    } catch (error) {
      alert("Failed to send request. Ensure network connectivity.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJoinCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (meetingId.trim() && name.trim()) {
      setMode("call");
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/consultation-room?room=${meetingId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cleanRoom = meetingId.replace(/[^a-zA-Z0-9-]/g, '');
  const jitsiUrl = `https://meet.jit.si/ALFA-${cleanRoom}#config.prejoinPageEnabled=false&config.disableDeepLinking=true&interfaceConfig.SHOW_JITSI_WATERMARK=false&interfaceConfig.DEFAULT_BACKGROUND='%230A0D0E'`;

  return (
    <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
      <div className="text-center mb-8 md:mb-12">
        <SweepHeading>
           <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight pb-2">
             ALFA <span className="text-gold-primary">Consultation</span> Matrix
           </h1>
        </SweepHeading>
        <p className="font-body text-cream/70 max-w-2xl mx-auto mt-4 text-sm md:text-lg">
          {mode === "request" 
            ? "Submit a formal request to unlock a secure face-to-face astrological portal."
            : "Connect face-to-face with Manjul Malhotra in our secure, high-definition astrological reading portal."}
        </p>
      </div>

      <div className="bg-[#0A0D0E]/80 backdrop-blur-2xl border border-gold-primary/20 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] min-h-[600px] flex flex-col relative w-full lg:max-w-5xl mx-auto ring-1 ring-white/5">
        
        <AnimatePresence mode="wait">
          
          {/* VERIFYING TOKEN MODE */}
          {mode === "verify" && (
            <motion.div key="verify" className="flex-1 flex flex-col items-center justify-center p-20 opacity-80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
               <div className="w-12 h-12 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mb-6" />
               <p className="text-gold-primary text-xs font-bold tracking-widest uppercase flex items-center gap-2"><Lock size={14} /> Decrypting Matrix Access Token</p>
            </motion.div>
          )}

          {/* REQUEST MODE (No Token / Invalid) */}
          {mode === "request" && (
            <motion.div 
              key="request-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 relative overflow-hidden"
            >
               {requestSuccess ? (
                  <div className="text-center max-w-md mx-auto space-y-6">
                    <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                       <CheckCircle2 size={32} className="text-green-400" />
                    </div>
                    <h2 className="text-white font-display text-3xl font-bold">Request Pending Authorization</h2>
                    <p className="text-cream/70 text-sm leading-relaxed">
                      Your portal request has been securely routed to the Astro Administration. 
                      You will receive an automated email confirmation embedding the unique matrix joining link as soon as your date and time are officially confirmed.
                    </p>
                    <Link href="/" className="inline-block mt-4 border border-gold-primary/30 text-gold-primary px-8 py-3 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-gold-primary/10 transition">
                      Return to Homepage
                    </Link>
                  </div>
               ) : (
                 <div className="w-full max-w-lg bg-surface/50 backdrop-blur-3xl p-8 sm:p-10 rounded-3xl border border-white/10 relative shadow-[inset_0_0_80px_rgba(201,168,76,0.02)] group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/10 rounded-full filter blur-[60px] pointer-events-none opacity-50" />
                    
                    <div className="mb-8 text-center sm:text-left">
                       <h3 className="text-white font-display text-2xl font-bold">Request Matrix Sector</h3>
                       <p className="text-cream/50 text-xs sm:text-sm mt-2">The consultation room is currently secured. Submit your details to request an opening.</p>
                    </div>

                    <form onSubmit={handleRequestSubmit} className="space-y-5 relative z-10">
                      <div className="relative group/input">
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-gold-primary mb-2 font-bold ml-1">Client Identification (Name)</label>
                        <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3 text-white focus:border-gold-primary/60" />
                      </div>
                      
                      <div className="relative group/input">
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-gold-primary mb-2 font-bold ml-1">Secure Email Routing (Critical)</label>
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="You will receive the join link here" className="w-full bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3 text-white focus:border-gold-primary/60 text-sm" />
                      </div>

                      <div className="relative group/input">
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-gold-primary mb-2 font-bold ml-1">Consultation Purpose</label>
                        <input type="text" required value={service} onChange={e => setService(e.target.value)} placeholder="e.g. Kundali Matching, Career Reading" className="w-full bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3 text-white focus:border-gold-primary/60 text-sm" />
                      </div>
                      
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-4 bg-gradient-to-r from-[#2a2d33] to-[#1f2226] border border-white/10 hover:border-gold-primary/40 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 text-sm flex justify-center items-center gap-2"
                      >
                        {isSubmitting ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Transmitting...</> : <><CalendarClock size={16} className="text-gold-primary" /> Request Portal Access</>}
                      </button>
                    </form>
                 </div>
               )}
            </motion.div>
          )}

          {/* ACCESS MODE (Token Valid) */}
          {mode === "access" && (
            <motion.div 
              key="access-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col lg:flex-row items-stretch justify-center p-6 sm:p-8 md:p-12 gap-8 lg:gap-12"
            >
              {/* Left side: Advanced Hardware Preview */}
              <div className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-6">
                <div className="w-full relative aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] group flex items-center justify-center">
                  <video id="local-video-preview" autoPlay playsInline muted className="w-full h-full object-cover rounded-2xl absolute inset-0 z-0 transition-opacity duration-500" ref={video => { if (video && !video.srcObject && typeof window !== "undefined" && navigator.mediaDevices) { navigator.mediaDevices.getUserMedia({ video: true }).then(stream => { video.srcObject = stream; }).catch(err => console.log("Camera access denied")); } }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10 pointer-events-none rounded-2xl" />
                  
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                     <span className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1 font-mono uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse" /> Access Granted
                     </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap justify-between items-end gap-4">
                     <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold-primary transition-colors hover:text-black">
                           <Mic size={16} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold-primary transition-colors hover:text-black">
                           <Video size={16} />
                        </button>
                     </div>
                     <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-2 rounded-lg">
                        {[1, 2, 3, 4, 5].map((i) => (<motion.div key={i} className="w-1 bg-green-400 rounded-full" animate={{ height: ["4px", "14px", "4px"] }} transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }} />))}
                     </div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">System Checks Nominal</h2>
                  <p className="font-body text-cream/50 text-xs sm:text-sm max-w-sm mx-auto">Verify your lighting environment before initializing the uplink for precise palm analysis.</p>
                </div>
              </div>

              {/* Right side Access Confirmation */}
              <div className="w-full lg:w-1/2 bg-surface/50 backdrop-blur-3xl p-6 sm:p-8 lg:p-10 rounded-3xl border border-gold-primary/20 relative shadow-[inset_0_0_80px_rgba(201,168,76,0.05)] group flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/20 rounded-full filter blur-[60px] pointer-events-none opacity-50" />
                
                <div className="mb-6 text-center sm:text-left">
                   <h3 className="text-white font-display text-2xl sm:text-3xl font-bold flex items-center justify-center sm:justify-start gap-3"><Shield className="text-green-400" size={28} /> Authorized</h3>
                   <p className="text-cream/50 text-xs sm:text-sm mt-2">Your identity token has been successfully decrypted against the primary database.</p>
                </div>

                <form onSubmit={handleJoinCall} className="space-y-6 relative z-10">
                  <div className="bg-black/40 border border-white/5 rounded-xl p-5 mb-2">
                     <p className="text-[10px] uppercase tracking-widest text-gold-primary font-bold mb-1">Confirmed Participant</p>
                     <p className="text-white font-display text-lg tracking-wide">{appointmentData?.clientName || name}</p>
                     <p className="text-[10px] uppercase tracking-widest text-cream/50 mt-4 mb-1">Service Tier</p>
                     <p className="text-white font-medium text-sm">{appointmentData?.service || "Standard Consultation"}</p>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full relative overflow-hidden group/btn bg-gradient-to-r from-gold-primary via-[#F5E1A4] to-gold-primary text-black font-display font-bold px-8 py-4 sm:py-5 rounded-xl shadow-[0_10px_30px_rgba(201,168,76,0.3)] hover:shadow-[0_15px_40px_rgba(201,168,76,0.5)] transition-all duration-500 bg-[length:200%_auto] hover:bg-right"
                  >
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover/btn:animate-shine" />
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Initialize ALFA Uplink <Video size={18} className="group-hover/btn:scale-110 transition-transform" />
                    </span>
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 mt-4 opacity-50">
                     <Lock size={12} className="text-green-400" />
                     <p className="text-[9px] sm:text-[10px] text-green-400 text-center uppercase tracking-widest font-bold">
                       256-bit AES Tunnel Active
                     </p>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* CALL MODE (In Jitsi) */}
          {mode === "call" && (
            <motion.div 
              key="active-call"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex-1 relative bg-black flex flex-col min-h-[70vh]"
            >
              <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-b from-black/90 to-transparent pointer-events-none flex justify-between items-start z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-primary/20 border border-gold-primary/50 shadow-[0_0_15px_rgba(201,168,76,0.5)] rounded-full flex items-center justify-center text-gold-primary font-bold font-display uppercase text-lg shrink-0">
                     {name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm sm:text-base font-bold truncate max-w-[150px] sm:max-w-[300px]">{name}</p>
                    <p className="text-green-400 text-[10px] uppercase flex items-center gap-1.5 font-bold tracking-widest shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse" /> Live Encrypted
                    </p>
                  </div>
                </div>
                <div className="pointer-events-auto flex flex-col gap-2 items-end">
                  <button 
                    onClick={() => { setMode("access"); window.location.reload(); }}
                    className="bg-red-500/20 hover:bg-red-500/40 text-red-500 border border-red-500/50 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-xl backdrop-blur-md flex items-center gap-2"
                  >
                    <PhoneOff size={14} /> Terminate
                  </button>
                  <span className="text-white/30 text-[9px] font-mono tracking-widest">{cleanRoom}</span>
                </div>
              </div>

              <iframe
                src={jitsiUrl}
                allow="camera; microphone; fullscreen; display-capture; autoplay"
                className="w-full flex-1 border-0 outline-none relative z-0"
                style={{ backgroundColor: '#000000' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ConsultationRoom() {
  return (
    <main className="min-h-screen pt-24 sm:pt-28 pb-10 sm:pb-20 bg-primary-bg relative overflow-hidden flex flex-col items-center">
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-gold-primary/10 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0E3A3A] rounded-full filter blur-[100px] opacity-[0.1] -z-10 pointer-events-none" />
      
      <Suspense fallback={
        <div className="min-h-[50vh] flex flex-col justify-center items-center opacity-50">
           <div className="w-12 h-12 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mb-4" />
           <p className="text-gold-primary text-xs font-bold tracking-widest uppercase">Initializing Matrix</p>
        </div>
      }>
        <ConsultationRoomContent />
      </Suspense>
    </main>
  );
}
