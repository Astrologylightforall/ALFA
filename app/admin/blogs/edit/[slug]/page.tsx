"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, FileEdit, AlertCircle } from "lucide-react";

export default function EditBlogPost({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { slug } = params;
  
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        const data = await res.json();
        if (data.success) {
          setContent(data.content);
        } else {
          setError(data.message || "Failed to load blog content");
        }
      } catch (err) {
        setError("Error connecting to server");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      
      if (data.success) {
        alert("Modifications saved successfully!");
        router.push("/admin/blogs");
        router.refresh();
      } else {
        alert(data.message || "Failed to update post.");
      }
    } catch (err) {
      alert("Error saving the file.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gold-primary font-bold uppercase tracking-widest text-sm">Decoding File Sequence</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle size={48} className="text-red-500 mb-4 opacity-80" />
        <h2 className="text-2xl font-display font-bold text-white mb-2">Error Loading File</h2>
        <p className="text-cream/60">{error}</p>
        <Link href="/admin/blogs" className="mt-6 text-gold-primary hover:underline uppercase tracking-widest text-xs font-bold">Return to Library</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-fade-in relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="flex justify-between items-center mb-8 relative z-10">
        <Link href="/admin/blogs" className="flex items-center gap-2 text-gold-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg">
           <ArrowLeft size={16} /> Back
        </Link>
        <div className="text-right">
           <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center justify-end gap-3">
              <FileEdit className="text-gold-primary" /> Edit Article
           </h1>
           <p className="text-cream/40 text-xs font-mono mt-1">{slug}.md</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="relative z-10 flex flex-col min-h-[70vh]">
        {/* RAW Content Editor Block */}
        <div className="bg-surface/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col flex-1">
           <div className="flex justify-between items-center mb-4">
             <label className="text-[10px] uppercase tracking-widest text-gold-primary font-bold flex items-center gap-2">
               Raw Markdown & Frontmatter Editor
             </label>
             <span className="text-[9px] bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Advanced Mode</span>
           </div>
           
           <textarea 
             required
             value={content}
             onChange={(e) => setContent(e.target.value)}
             className="w-full flex-1 bg-[#111617]/90 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-cream/90 focus:outline-none focus:border-gold-primary/60 transition-all font-mono text-sm leading-relaxed shadow-[inset_0_5px_30px_rgba(0,0,0,0.5)] resize-y min-h-[500px]"
             spellCheck={false}
           />
        </div>

        <div className="flex justify-end pt-6 mt-4 border-t border-white/5">
           <button 
             type="submit"
             disabled={isSaving || !content}
             className="relative overflow-hidden group bg-gradient-to-r from-gold-primary via-[#F5E1A4] to-gold-primary text-black font-display font-bold px-10 py-4 rounded-xl shadow-[0_10px_30px_rgba(201,168,76,0.2)] hover:shadow-[0_15px_40px_rgba(201,168,76,0.4)] transition-all duration-500 bg-[length:200%_auto] hover:bg-right disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
           >
              <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
              <span className="relative z-10 flex items-center gap-2">
                {isSaving ? "Overwriting..." : "Commit Changes"} <Save size={18} />
              </span>
           </button>
        </div>
      </form>
    </div>
  );
}
