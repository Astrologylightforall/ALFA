"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, CalendarDays, FileText, Settings, LogOut, Menu, X, Bell } from "lucide-react";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { label: "Dashboard Overview", href: "/admin", icon: <LayoutDashboard size={18} /> },
    { label: "Consultations", href: "/admin/appointments", icon: <CalendarDays size={18} /> },
    { label: "Blog Content", href: "/admin/blogs", icon: <FileText size={18} /> },
    { label: "Site Settings", href: "/admin/settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-primary-bg flex font-body">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed lg:static top-0 left-0 w-64 h-full bg-[#0A0D0E] border-r border-white/5 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} transition-transform duration-300 flex flex-col`}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full border border-gold-primary/30 flex items-center justify-center bg-gold-primary/10">
               <span className="text-gold-primary font-bold font-display text-sm">A</span>
             </div>
             <div>
               <h2 className="text-white font-display font-bold tracking-wide">ALFA Admin</h2>
               <p className="text-[9px] text-gold-primary uppercase tracking-widest">Portal Access</p>
             </div>
          </Link>
          <button className="lg:hidden text-white/50" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${isActive ? "bg-gold-primary text-black shadow-lg shadow-gold-primary/20" : "text-cream/60 hover:bg-white/5 hover:text-white"}`}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-medium text-sm"
          >
            <LogOut size={18} /> Terminate Session
          </button>
        </div>
      </aside>

      {/* Main UI Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden relative">
        {/* Topbar */}
        <header className="h-16 lg:h-20 bg-[#0A0D0E]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
           <div className="flex items-center gap-4">
              <button 
                className="lg:hidden text-white hover:text-gold-primary transition"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <h1 className="text-white font-display font-semibold hidden sm:block">Welcome, Manjul Ji</h1>
           </div>

           <div className="flex items-center gap-6 text-cream/60">
              <button className="relative hover:text-white transition group">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full group-hover:animate-ping" />
              </button>
              <Link href="/" target="_blank" className="text-xs font-bold uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full hover:border-gold-primary hover:text-gold-primary transition">
                View Live Site
              </Link>
           </div>
        </header>

        {/* Dashboard Content Injection */}
        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
