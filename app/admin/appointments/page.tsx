"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CalendarDays, Video, CheckCircle2, Clock, Search, MoreHorizontal, MessageCircle, AlertCircle, Plus, X, CalendarCheck } from "lucide-react";

type Appointment = {
  id: string;
  clientName: string;
  email?: string;
  service: string;
  date: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  amount: string;
  platform: "Zoom" | "Google Meet" | "ALFA Portal" | "In-Person";
};

export default function AppointmentsTracker() {
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Scheduling Modal States
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [isScheduling, setIsScheduling] = useState(false);
  
  const [newAppt, setNewAppt] = useState({
    clientName: "",
    service: "Vedic Consultation",
    date: "",
    platform: "ALFA Portal",
    amount: "₹x,xxx"
  });

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newAppt, status: "Confirmed" }),
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchAppointments();
      }
    } catch (error) {
      alert("Failed to save entry.");
    }
  };

  const handleApproveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppt || !scheduleDate) return;
    
    setIsScheduling(true);
    try {
      const res = await fetch(`/api/appointments/${selectedAppt.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          status: "Confirmed", 
          date: scheduleDate 
        }),
      });
      if (res.ok) {
        setScheduleModalOpen(false);
        setScheduleDate("");
        setSelectedAppt(null);
        fetchAppointments(); // Refresh the grid
      }
    } catch (error) {
      alert("Failed to confirm schedule.");
    } finally {
      setIsScheduling(false);
    }
  };

  const filteredAppointments = appointments.filter(a => 
    a.clientName.toLowerCase().includes(search.toLowerCase()) || 
    (a.id && a.id.toLowerCase().includes(search.toLowerCase())) ||
    a.service.toLowerCase().includes(search.toLowerCase())
  );

  const StatusBadge = ({ status }: { status: Appointment["status"] }) => {
    const styles = {
      Confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
      Pending: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      Completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      Cancelled: "bg-red-500/10 text-red-400 border-red-500/20"
    };

    return (
      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20 relative">
      
      {/* Quick Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleCreate} className="bg-surface/90 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button type="button" onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X size={20} />
            </button>
            <h3 className="font-display font-bold text-white text-xl mb-4">Manual Entry</h3>
            
            <div className="space-y-4">
               <div>
                 <label className="text-[10px] uppercase text-gold-primary tracking-widest font-bold block mb-1">Client Name</label>
                 <input required type="text" value={newAppt.clientName} onChange={e => setNewAppt({...newAppt, clientName: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-gold-primary outline-none" />
               </div>
               <div>
                 <label className="text-[10px] uppercase text-gold-primary tracking-widest font-bold block mb-1">Service Type</label>
                 <input required type="text" value={newAppt.service} onChange={e => setNewAppt({...newAppt, service: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-gold-primary outline-none" />
               </div>
               <div>
                 <label className="text-[10px] uppercase text-gold-primary tracking-widest font-bold block mb-1">Date & Time</label>
                 <input required type="text" placeholder="Oct 26, 2026 - 14:00 IST" value={newAppt.date} onChange={e => setNewAppt({...newAppt, date: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-gold-primary outline-none" />
               </div>
               <button type="submit" className="w-full bg-gold-primary text-black font-bold py-3 mt-4 rounded-xl hover:bg-gold-light transition">
                 Save to Database
               </button>
            </div>
          </form>
        </div>
      )}

      {/* Schedule & Approve Modal */}
      {scheduleModalOpen && selectedAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-[2px]">
          <form onSubmit={handleApproveSchedule} className="bg-surface/90 border border-gold-primary/30 rounded-3xl w-full max-w-md p-8 shadow-[0_20px_50px_rgba(201,168,76,0.15)] relative">
            <button type="button" onClick={() => setScheduleModalOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition">
              <X size={20} />
            </button>
            <h3 className="font-display font-bold text-white text-2xl mb-1 flex items-center gap-2">
               <CalendarCheck className="text-gold-primary" /> Schedule Matrix
            </h3>
            <p className="text-cream/50 text-xs mb-6">Assigning a temporal slot will automatically dispatch AES verification keys securely to the client's email inbox.</p>
            
            <div className="space-y-4">
               <div className="bg-black/40 p-4 rounded-xl border border-white/5 mb-2">
                 <p className="text-[10px] uppercase tracking-widest text-gold-primary font-bold mb-1">Pending Client</p>
                 <p className="text-white font-display text-lg tracking-wide">{selectedAppt.clientName}</p>
                 <p className="text-cream/40 text-xs font-mono">{selectedAppt.email || "No email bound"}</p>
               </div>
               
               <div>
                 <label className="text-[10px] uppercase text-gold-primary tracking-widest font-bold block mb-2 ml-1">Assign Temporal Slot (Format Example: Nov 12, 14:00 IST)</label>
                 <input 
                   required 
                   type="text" 
                   value={scheduleDate} 
                   onChange={e => setScheduleDate(e.target.value)} 
                   placeholder="e.g. Wednesday 15th, 2 PM" 
                   className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-gold-primary outline-none shadow-inner" 
                 />
               </div>

               <button 
                 type="submit" 
                 disabled={isScheduling}
                 className="w-full bg-gradient-to-r from-gold-primary to-[#F5E1A4] text-black font-bold py-4 mt-2 rounded-xl hover:scale-[1.02] transition shadow-lg flex items-center justify-center gap-2 text-sm"
               >
                 {isScheduling ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <><CheckCircle2 size={16} /> Confirm & Dispatch Invites</>}
               </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-surface/40 p-6 rounded-2xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/5 rounded-full filter blur-[80px]" />
        
        <div className="relative z-10 flex-1">
          <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
             <CalendarDays className="text-gold-primary" /> Session Orchestration
          </h1>
          <p className="text-cream/50 text-sm mt-1 max-w-lg">
            Manage upcoming astrology consultations, approve secured portal requests, and generate virtual meeting environments natively.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="relative z-10 flex items-center gap-2 bg-gradient-to-r from-gold-primary via-[#F5E1A4] to-gold-primary text-black font-bold uppercase tracking-widest text-[10px] px-6 py-3 rounded-xl hover:scale-105 transition-all bg-[length:200%_auto] hover:bg-right"
        >
          <Plus size={16} /> Quick Add
        </button>
      </div>

      {/* Database Controls */}
      <div className="flex items-center gap-4 bg-[#0A0D0E]/60 border border-white/5 p-4 rounded-xl">
        <Search size={18} className="text-cream/40" />
        <input 
          type="text" 
          placeholder="Filter consultations by Client Name, ID, or Service Type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none text-white w-full focus:outline-none text-sm placeholder-cream/20"
        />
      </div>

      {/* Main Table View */}
      <div className="bg-surface/40 border border-white/5 rounded-2xl overflow-hidden min-h-[500px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 opacity-50">
            <div className="w-8 h-8 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gold-primary text-[10px] font-bold uppercase tracking-widest">Querying Persistence Array</p>
          </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-cream/50 font-bold border-b border-white/10">
                <th className="p-5 pl-6">Identifier</th>
                <th className="p-5">Client Profile</th>
                <th className="p-5">Scheduling Info</th>
                <th className="p-5">Gateway</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right pr-6">Controls</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appt) => (
                <tr key={appt.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="p-5 pl-6 text-cream/40 font-mono text-xs">
                    {appt.id}
                  </td>
                  <td className="p-5">
                    <p className="text-white font-bold text-sm tracking-wide">{appt.clientName}</p>
                    <p className="text-gold-primary text-xs mt-1 truncate max-w-[200px]">{appt.service}</p>
                  </td>
                  <td className="p-5">
                    {appt.date === "TBD" ? (
                       <span className="text-orange-400/50 text-[10px] uppercase tracking-widest font-bold">Unassigned</span>
                    ) : (
                      <p className="flex items-center gap-2 text-cream/80 text-xs font-mono">
                        <Clock size={12} className="text-blue-400" /> {appt.date}
                      </p>
                    )}
                  </td>
                  <td className="p-5">
                    <span className="flex items-center gap-2 text-cream/60 text-xs">
                      {appt.platform === 'ALFA Portal' ? <Video size={14} className="text-purple-400" /> : <CalendarDays size={14} />}
                      {appt.platform}
                    </span>
                  </td>
                  <td className="p-5">
                    <StatusBadge status={appt.status} />
                  </td>
                  <td className="p-5 pr-6">
                    <div className="flex justify-end gap-2">
                       {/* Contextual Approval Logic mapping */}
                       {appt.status === 'Pending' ? (
                          <button 
                            onClick={() => { setSelectedAppt(appt); setScheduleModalOpen(true); }}
                            className="bg-green-500/10 hover:bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors flex items-center gap-2 border border-green-500/20 shadow-md"
                          >
                            <CalendarCheck size={14} /> Schedule
                          </button>
                       ) : appt.platform === 'ALFA Portal' && appt.status === 'Confirmed' ? (
                          <Link 
                            href={`/consultation-room?room=${appt.id}`} 
                            target="_blank"
                            className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-lg transition-colors flex items-center gap-2 border border-purple-500/20 shadow-md"
                          >
                            <Video size={14} /> Initiate Room
                          </Link>
                       ) : (
                          <button className="bg-white/5 hover:bg-white/10 text-cream/80 text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-lg transition-colors flex items-center gap-2 border border-white/10">
                            <MoreHorizontal size={14} /> Options
                          </button>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredAppointments.length === 0 && (
             <div className="p-12 text-center text-cream/40 font-mono text-sm">
               No appointments found in the active filtering segment.
             </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
}
