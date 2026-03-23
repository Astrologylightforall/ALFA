"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles, Image as ImageIcon } from "lucide-react";

export default function CreateBlogPost() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    date: new Date().toISOString().split("T")[0],
    image: "/images/blog1.jpg",
    published: true,
    content: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "published" ? value === "true" : value
    }));
  };

  const generateSlug = () => {
    if (!formData.title) return;
    const newSlug = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData(prev => ({ ...prev, slug: newSlug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success) {
        alert("Blog posted successfully!");
        router.push("/admin/blogs");
        router.refresh();
      } else {
        alert(data.message || "Failed to create post.");
      }
    } catch (err) {
      alert("Error submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-fade-in relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="flex justify-between items-center mb-8 relative z-10">
        <Link href="/admin/blogs" className="flex items-center gap-2 text-gold-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
           <ArrowLeft size={16} /> Back to Library
        </Link>
        <h1 className="text-2xl font-display font-bold text-white tracking-tight">Compose New Article</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        
        {/* Core Metadata Frame */}
        <div className="bg-surface/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 shadow-xl space-y-6 group">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-widest text-gold-primary font-bold ml-1">Article Title</label>
                 <input 
                   type="text" 
                   required
                   name="title"
                   value={formData.title}
                   onChange={handleChange}
                   onBlur={generateSlug}
                   placeholder="e.g. The Power of Jupiter Transit"
                   className="w-full bg-[#111617]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white placeholder-cream/20 focus:outline-none focus:border-gold-primary/60 transition-all shadow-inner text-sm"
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-widest text-gold-primary font-bold ml-1">URL Slug</label>
                 <input 
                   type="text" 
                   required
                   name="slug"
                   value={formData.slug}
                   onChange={handleChange}
                   placeholder="the-power-of-jupiter"
                   className="w-full bg-[#111617]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white placeholder-cream/20 focus:outline-none focus:border-gold-primary/60 transition-all font-mono text-sm shadow-inner"
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-widest text-gold-primary font-bold ml-1">Publication Date</label>
                 <input 
                   type="date" 
                   required
                   name="date"
                   value={formData.date}
                   onChange={handleChange}
                   className="w-full bg-[#111617]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-primary/60 transition-all text-sm shadow-inner [color-scheme:dark]"
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-widest text-gold-primary font-bold ml-1">Status</label>
                 <select 
                   name="published" 
                   value={formData.published.toString()}
                   onChange={handleChange}
                   className="w-full bg-[#111617]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-primary/60 transition-all text-sm shadow-inner appearance-none"
                 >
                    <option value="true">Published (Live)</option>
                    <option value="false">Draft (Hidden)</option>
                 </select>
              </div>
           </div>

           <div className="space-y-2 border-t border-white/5 pt-6 mt-6">
               <label className="text-[10px] uppercase tracking-widest text-gold-primary font-bold ml-1 flex items-center gap-2">
                 <ImageIcon size={14} /> Featured Image Path
               </label>
               <input 
                 type="text" 
                 name="image"
                 value={formData.image}
                 onChange={handleChange}
                 placeholder="/images/blog1.jpg"
                 className="w-full bg-[#111617]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white placeholder-cream/20 focus:outline-none focus:border-gold-primary/60 transition-all shadow-inner text-sm font-mono"
               />
           </div>
        </div>

        {/* Content Editor Block */}
        <div className="bg-surface/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 shadow-xl flex flex-col min-h-[500px]">
           <label className="text-[10px] uppercase tracking-widest text-gold-primary font-bold mb-4 flex items-center gap-2">
             <Sparkles size={14} /> Markdown Content Editor
           </label>
           
           <textarea 
             required
             name="content"
             value={formData.content}
             onChange={handleChange}
             placeholder="## Introduction...\n\nWrite your astrological insights here using Markdown syntax."
             className="w-full flex-1 bg-[#111617]/80 backdrop-blur-xl border border-white/10 rounded-xl p-5 text-cream/90 placeholder-cream/20 focus:outline-none focus:border-gold-primary/60 transition-all font-mono text-sm leading-relaxed shadow-[inset_0_5px_30px_rgba(0,0,0,0.5)] resize-y min-h-[400px]"
           />
        </div>

        <div className="flex justify-end pt-4">
           <button 
             type="submit"
             disabled={isSubmitting || !formData.title || !formData.content}
             className="relative overflow-hidden group bg-gradient-to-r from-gold-primary via-[#F5E1A4] to-gold-primary text-black font-display font-bold px-10 py-4 rounded-xl shadow-[0_10px_30px_rgba(201,168,76,0.2)] hover:shadow-[0_15px_40px_rgba(201,168,76,0.4)] transition-all duration-500 bg-[length:200%_auto] hover:bg-right disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
           >
              <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? "Writing File..." : "Publish Article"} <Save size={18} />
              </span>
           </button>
        </div>
      </form>
    </div>
  );
}
