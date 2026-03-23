"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Activity, Target, Compass } from "lucide-react";
import Link from "next/link";
import { SweepHeading } from "@/components/ui/AnimatedText";

const LIFE_PATH_DATA: Record<number, { title: string; traits: string; color: string; description: string }> = {
  1: { title: "The Leader", traits: "Independent, Ambitious, Pioneering", color: "text-red-400", description: "You are a born leader with a pioneering spirit. You excel when you take charge and forge new paths." },
  2: { title: "The Peacemaker", traits: "Diplomatic, Intuitive, Cooperative", color: "text-orange-400", description: "You are highly intuitive and diplomatic, skilled at bringing people together and creating harmony in any environment." },
  3: { title: "The Communicator", traits: "Creative, Social, Expressive", color: "text-yellow-400", description: "Your energy is creative and vibrant. You inspire others through your self-expression, art, or communication." },
  4: { title: "The Builder", traits: "Practical, Hard-working, Loyal", color: "text-green-400", description: "You are the foundation that others rely on. Your practical and hard-working nature leads to long-lasting success." },
  5: { title: "The Adventurer", traits: "Dynamic, Freedom-loving, Versatile", color: "text-blue-400", description: "You crave freedom and adventure. You are versatile and adaptable, thriving in dynamic environments." },
  6: { title: "The Nurturer", traits: "Responsible, Caring, Protective", color: "text-indigo-400", description: "You have a deep sense of responsibility and care for your community and loved ones. You are a natural healer." },
  7: { title: "The Seeker", traits: "Analytical, Spiritual, Wise", color: "text-purple-400", description: "You are analytical and spiritually inclined. You search for deeper truths and possess great inner wisdom." },
  8: { title: "The Powerhouse", traits: "Ambitious, Organized, Successful", color: "text-pink-400", description: "You have strong executive abilities and are driven towards financial and material success." },
  9: { title: "The Humanitarian", traits: "Compassionate, Generous, Idealistic", color: "text-gold-light", description: "You are deeply compassionate with a global vision. You are driven by a desire to help others and make the world better." },
  11: { title: "The Illuminator (Master Number)", traits: "Intuitive, Inspiring, Visionary", color: "text-cyan-400", description: "You possess extraordinary intuition and spiritual insight. You are here to inspire and illuminate humanity." },
  22: { title: "The Master Builder (Master Number)", traits: "Practical, Visionary, Capable", color: "text-emerald-400", description: "You can turn grand visions into reality. You possess both deep spiritual understanding and practical application." },
  33: { title: "The Master Teacher (Master Number)", traits: "Compassionate, Healing, Spiritual", color: "text-fuchsia-400", description: "You are a spiritual teacher of the highest order, dedicated to the healing and uplifting of mankind." },
};

export default function NumerologyCalculator() {
  const [dob, setDob] = useState("");
  const [lifePathNumber, setLifePathNumber] = useState<number | null>(null);

  const calculateLifePath = (dateString: string) => {
    if (!dateString) return;
    
    // Reduce a number to a single digit (unless it's a master number 11, 22, 33)
    const reduceNumber = (num: number): number => {
      if (num === 11 || num === 22 || num === 33) return num;
      if (num < 10) return num;
      const sum = num.toString().split('').reduce((a, b) => a + parseInt(b), 0);
      return reduceNumber(sum);
    };

    const parts = dateString.split("-");
    if (parts.length === 3) {
      const year = reduceNumber(parseInt(parts[0]));
      const month = reduceNumber(parseInt(parts[1]));
      const day =  reduceNumber(parseInt(parts[2]));
      
      const total = reduceNumber(year + month + day);
      setLifePathNumber(total);
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculateLifePath(dob);
  };

  const resultData = lifePathNumber ? LIFE_PATH_DATA[lifePathNumber] || LIFE_PATH_DATA[1] : null;

  return (
    <section className="py-24 bg-secondary-bg relative px-4 overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-primary/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 relative">
        
        {/* Left Side: Form */}
        <div className="space-y-8">
          <div>
            <span className="text-gold-primary text-xs uppercase tracking-widest font-semibold font-body block opacity-80 mb-2">
              Cosmic Numerology
            </span>
            <SweepHeading>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight pb-2">
                Discover Your <br/><span className="text-gold-primary">Life Path Number</span>
              </h2>
            </SweepHeading>
            <p className="font-body text-cream/70 mt-4 leading-relaxed max-w-md">
              Your birth date holds the secret to your cosmic blueprint. Calculate your Life Path Number to reveal your deepest traits, challenges, and life purpose based on Vedic numerology principles.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="bg-surface/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-xl flex flex-col gap-6 max-w-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/10 rounded-full filter blur-[40px] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity" />
            
            <div className="relative z-10">
              <label className="block text-[11px] uppercase tracking-widest text-gold-primary mb-2 font-bold ml-1">
                Enter your Date of Birth
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-[#111617]/80 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-cream/20 focus:outline-none focus:border-gold-primary/60 focus:bg-white/5 transition-all duration-300 shadow-inner [color-scheme:dark]"
              />
            </div>
            
            <button
              type="submit"
              disabled={!dob}
              className="w-full relative overflow-hidden group/btn bg-gradient-to-r from-gold-primary via-[#F5E1A4] to-gold-primary text-black font-display font-bold px-8 py-4 rounded-xl shadow-[0_10px_30px_rgba(201,168,76,0.2)] hover:shadow-[0_15px_40px_rgba(201,168,76,0.4)] transition-all duration-500 bg-[length:200%_auto] hover:bg-right disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover/btn:animate-shine" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Calculate Destiny <Sparkles size={18} />
              </span>
            </button>
          </form>
        </div>

        {/* Right Side: Result Display */}
        <div className="h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {lifePathNumber && resultData ? (
              <motion.div
                key={lifePathNumber}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full bg-[#0A0D0E]/80 backdrop-blur-3xl border border-gold-primary/30 p-8 md:p-10 rounded-3xl shadow-[inset_0_0_80px_rgba(201,168,76,0.08)] relative overflow-hidden"
              >
                {/* Large Background Number Watermark */}
                <div className="absolute -right-10 -bottom-10 text-[200px] font-display font-bold text-white/5 pointer-events-none select-none">
                  {lifePathNumber}
                </div>

                <div className="relative z-10">
                  <div className="flex items-end gap-4 border-b border-white/10 pb-6 mb-6">
                    <span className="text-6xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gold-primary">
                      {lifePathNumber}
                    </span>
                    <div className="pb-2">
                      <p className="text-xs text-cream/50 uppercase tracking-widest font-bold">Life Path Number</p>
                      <h3 className={`font-display text-2xl md:text-3xl font-bold ${resultData.color} mt-1 drop-shadow-md`}>
                        {resultData.title}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Target size={20} className="text-gold-primary shrink-0 mt-1" />
                      <div>
                        <h4 className="text-white font-bold text-sm tracking-wide">Core Traits</h4>
                        <p className="text-cream/80 text-sm mt-1 leading-relaxed">
                          {resultData.traits}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Compass size={20} className="text-gold-primary shrink-0 mt-1" />
                      <div>
                        <h4 className="text-white font-bold text-sm tracking-wide">Destiny Analysis</h4>
                        <p className="text-cream/70 text-sm mt-1 leading-relaxed">
                          {resultData.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6">
                       <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-gold-primary hover:text-white transition-colors font-bold uppercase tracking-wider group">
                         Get detailed numbers reading <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                       </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex-col flex items-center justify-center p-12 text-center border-2 border-dashed border-white/10 rounded-3xl min-h-[400px]"
              >
                <div className="w-20 h-20 rounded-full bg-surface/50 border border-white/5 flex items-center justify-center text-white/20 mb-6">
                  <Activity size={32} />
                </div>
                <h3 className="text-white/40 font-display text-xl max-w-xs leading-relaxed">
                  Enter your birth date to reveal your cosmic numerology
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
