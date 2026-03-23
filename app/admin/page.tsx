"use client";

import { Users, Eye, Calendar, TrendingUp, RefreshCw, BarChart } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

type Appointment = {
  id: string;
  clientName: string;
  service: string;
  date: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
};

export default function AdminDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [leadsCount, setLeadsCount] = useState(0);

  const fetchDashboardData = async () => {
    setIsRefreshing(true);
    try {
      const [apptRes, leadsRes] = await Promise.all([
        fetch("/api/appointments"),
        fetch("/api/leads")
      ]);
      
      if (apptRes.ok) {
        const aData = await apptRes.json();
        setAppointments(aData.appointments || []);
      }
      if (leadsRes.ok) {
        const lData = await leadsRes.json();
        setLeadsCount(lData.leads?.length || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = [
    { label: "Total Consultations", value: appointments.length.toString(), increase: "Live JSON Storage", icon: Calendar, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Active Website Visitors", value: "Offline Analytics", increase: "Pending Integration", icon: Eye, color: "text-green-400", bg: "bg-green-500/10" },
    { label: "New Leads / Queries", value: leadsCount.toString(), increase: "Live JSON Storage", icon: Users, color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Profile Conversions", value: "Tracking Unavailable", increase: "Requires Google Auth", icon: TrendingUp, color: "text-gold-primary", bg: "bg-gold-primary/10" },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-cream/50 text-sm mt-1">Real-time metrics sourced from native JSON storage arrays.</p>
        </div>
        <button 
          onClick={fetchDashboardData}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cream/70 hover:text-white bg-surface/40 border border-white/5 py-2 px-4 rounded-lg hover:border-gold-primary/30 transition-all"
        >
          <RefreshCw size={14} className={`${isRefreshing ? "animate-spin text-gold-primary" : ""}`} /> 
          Sync Database
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface/40 border border-white/5 rounded-2xl p-6 hover:border-gold-primary/20 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-[9px] font-bold tracking-widest uppercase ${stat.color} bg-[#0A0D0E]/50 px-2 py-1 rounded shadow-inner`}>
                {stat.increase}
              </span>
            </div>
            <h3 className="text-2xl font-display font-medium text-white tracking-tight break-words">{stat.value}</h3>
            <p className="text-cream/50 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart/Activity Area */}
        <div className="lg:col-span-2 bg-surface/40 border border-white/5 rounded-2xl p-6 min-h-[400px] flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full filter blur-[80px]" />
          
          <BarChart size={48} className="text-white/10 mb-4" />
          <h3 className="text-white text-lg font-bold font-display">Traffic Analytics Blocked</h3>
          <p className="text-cream/40 text-sm max-w-sm mt-2">
            Connect an external Google Analytics ID or plausible script in settings to populate live visitor graphing charts.
          </p>
          <Link href="/admin/settings" className="mt-6 border border-gold-primary/30 text-gold-primary px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-gold-primary/10 transition z-10 relative">
            System Configuration
          </Link>
        </div>

        {/* Side Panel: Recent Consultations */}
        <div className="bg-surface/40 border border-white/5 rounded-2xl p-6 flex flex-col relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-display font-bold text-lg">Upcoming Sessions</h3>
            <Link href="/admin/appointments" className="text-gold-primary text-xs cursor-pointer hover:underline">View All</Link>
          </div>

          <div className="space-y-4 flex-1">
            {appointments.length === 0 ? (
               <div className="text-cream/40 text-xs text-center py-10 font-mono">No live consultations stored yet.</div>
            ) : appointments.slice(0, 4).map((appt) => (
              <div key={appt.id} className="bg-[#0A0D0E]/60 border border-white/5 p-4 rounded-xl hover:border-gold-primary/20 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-bold text-sm tracking-wide">{appt.clientName}</h4>
                  <span className={`text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${appt.status === 'Confirmed' ? 'text-green-400 bg-green-400/10' : 'text-orange-400 bg-orange-400/10'}`}>
                    {appt.status}
                  </span>
                </div>
                <p className="text-gold-primary text-xs font-medium">{appt.service}</p>
                <p className="text-cream/50 text-xs mt-1 font-mono">{appt.date}</p>
              </div>
            ))}
          </div>

          <Link href="/admin/appointments" className="block text-center w-full mt-6 bg-white/5 hover:bg-white/10 text-white text-sm font-bold py-3 rounded-xl transition-colors border border-white/5">
            + Manage Appointments
          </Link>
        </div>

      </div>
    </div>
  );
}
