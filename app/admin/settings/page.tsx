export default function AdminSettings() {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="bg-surface/40 p-6 rounded-2xl border border-white/5 relative overflow-hidden">
        <h1 className="text-3xl font-display font-bold text-white tracking-tight">System Configuration</h1>
        <p className="text-cream/50 text-sm mt-1 max-w-lg">Modify global astrology portal settings, update Google Analytics IDs, or reset access credentials.</p>
      </div>

      <div className="bg-[#0A0D0E]/60 border border-white/5 p-12 rounded-2xl flex flex-col items-center justify-center text-center">
         <div className="w-16 h-16 bg-gold-primary/10 rounded-full flex items-center justify-center mb-6 border border-gold-primary/30">
            <span className="text-gold-primary animate-pulse font-bold tracking-widest uppercase">WIP</span>
         </div>
         <h2 className="text-white font-display text-xl font-bold mb-2">Configuration Hub In Development</h2>
         <p className="text-cream/50 text-sm max-w-sm">Global system modifications are currently managed directly within the deployment variables. Database architecture integration pending.</p>
      </div>
    </div>
  );
}
