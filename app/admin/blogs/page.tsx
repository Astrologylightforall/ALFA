"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit3, Trash2, Eye, Search, AlertCircle, FileText } from "lucide-react";

type Blog = {
  slug: string;
  filename: string;
  title: string;
  date: string;
  published: boolean;
  size: number;
};

export default function AdminBlogsManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error("Failed to load blogs", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to permanently delete the blog "${slug}"?`)) return;
    
    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setBlogs(blogs.filter(b => b.slug !== slug));
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (err) {
      alert("Error deleting blog");
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-surface/40 p-6 rounded-2xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-[80px]" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
             <FileText className="text-gold-primary" /> Content Management
          </h1>
          <p className="text-cream/50 text-sm mt-1 max-w-lg">
            Create, edit, and manage all articles published on the main astrology blog. Data is written directly to the file system.
          </p>
        </div>
        
        <Link 
          href="/admin/blogs/create"
          className="relative z-10 flex items-center gap-2 bg-gradient-to-r from-gold-primary via-[#F5E1A4] to-gold-primary text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-full hover:scale-105 transition-all bg-[length:200%_auto] hover:bg-right shadow-[0_5px_20px_rgba(201,168,76,0.3)]"
        >
          <Plus size={16} /> New Article
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4 bg-[#0A0D0E]/60 border border-white/5 p-4 rounded-xl">
        <Search size={18} className="text-cream/40" />
        <input 
          type="text" 
          placeholder="Search articles by title or slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none text-white w-full focus:outline-none text-sm placeholder-cream/20"
        />
      </div>

      {/* Blogs List */}
      <div className="bg-surface/40 border border-white/5 rounded-2xl overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 opacity-50">
            <div className="w-10 h-10 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gold-primary text-sm font-bold uppercase tracking-widest">Scanning Filesystem</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-cream/40 text-center">
            <AlertCircle size={48} className="mb-4 opacity-50" />
            <p>No articles found matching your criteria.</p>
            {search && <button onClick={() => setSearch('')} className="mt-4 text-gold-primary hover:underline">Clear Search</button>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-cream/60 font-bold border-b border-white/10">
                  <th className="p-4 pl-6">Title & Metadata</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Size</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr key={blog.slug} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 pl-6">
                      <p className="text-white font-bold text-sm truncate max-w-sm">{blog.title}</p>
                      <p className="text-cream/40 text-[10px] font-mono mt-1">{blog.filename}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-cream/80 text-xs font-mono">{blog.date}</p>
                    </td>
                    <td className="p-4">
                      <span className={`text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded ${blog.published ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'}`}>
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-cream/50">
                      {(blog.size / 1024).toFixed(1)} KB
                    </td>
                    <td className="p-4 pr-6 flex justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/blog/${blog.slug}`} target="_blank" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-cream transition" title="View Live">
                        <Eye size={16} />
                      </Link>
                      <Link href={`/admin/blogs/edit/${blog.slug}`} className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition" title="Edit">
                        <Edit3 size={16} />
                      </Link>
                      <button onClick={() => handleDelete(blog.slug)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
