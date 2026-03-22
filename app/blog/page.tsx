import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogListingPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentCategory = (params.category as string) || 'All';

  const blogsDirectory = path.join(process.cwd(), 'content/blog');
  let files: string[] = [];
  try {
    files = fs.readdirSync(blogsDirectory);
  } catch(e) {
    // If no blog dir exists
  }

  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(blogsDirectory, filename), 'utf-8');
    const { data } = matter(fileContent);
    const slug = filename.replace('.md', '');
    
    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      category: data.category || 'Astrology',
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];
  
  const filteredPosts = currentCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === currentCategory);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const standardPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <>
      <section className="relative h-[45vh] min-h-[400px] flex items-center justify-center text-center px-4 overflow-hidden bg-primary-bg mt-[-6rem]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-primary/10 via-primary-bg to-secondary-bg"></div>
        <div className="max-w-4xl mx-auto z-10 space-y-4 pt-16 relative">
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
            Vedic Wisdom Blog
          </h1>
          <p className="font-body text-sm md:text-lg text-cream/70 max-w-xl mx-auto font-medium">
            Insights on transits, nakshatras, and spiritual guidance.
          </p>
        </div>
      </section>

      <section className="py-20 bg-secondary-bg px-4 border-t border-border-accent relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Category Filter Desktop Dummy */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => {
              const isActive = cat === currentCategory;
              return (
                <Link 
                  href={`/blog${cat === 'All' ? '' : `?category=${encodeURIComponent(cat)}`}`}
                  key={cat} 
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${isActive ? "bg-gold-primary text-primary-bg" : "bg-surface/40 text-cream border border-border-accent hover:border-gold-primary hover:text-gold-primary"}`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {featuredPost && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">Featured Insight</h2>
              <div className="bg-surface/30 backdrop-blur-md border border-gold-primary/30 rounded-[2rem] p-8 md:p-12 hover:border-gold-primary hover:shadow-[0_0_40px_rgba(201,168,76,0.1)] transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/5 rounded-full filter blur-[80px] group-hover:bg-gold-primary/10 transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-gold-primary text-[13px] font-bold tracking-widest uppercase">{featuredPost.category}</span>
                    <span className="text-muted-text text-sm">—</span>
                    <span className="text-muted-text text-xs">{featuredPost.date}</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-[2.5rem] font-bold text-white leading-tight mb-6 group-hover:text-gold-light transition-colors">
                    <Link href={`/blog/${featuredPost.slug}`} className="before:absolute before:inset-0 block">{featuredPost.title}</Link>
                  </h3>
                  <p className="font-body text-cream/80 text-base md:text-lg leading-relaxed max-w-3xl mb-8">
                    {featuredPost.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold-primary text-sm font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                    Read Article <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {standardPosts.map((post) => (
              <div key={post.slug} className="bg-surface/20 border border-border-accent p-8 rounded-[1.5rem] hover:bg-surface/40 hover:border-gold-primary/40 transition-all duration-300 group relative">
                <div className="flex items-center justify-between mb-4">
                   <span className="text-gold-primary text-[11px] font-bold tracking-widest uppercase">{post.category}</span>
                   <span className="text-xs text-muted-text">{post.date}</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-snug mb-4 group-hover:text-gold-light transition">
                  <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0">{post.title}</Link>
                </h3>
                <p className="font-body text-[14px] text-cream/70 leading-relaxed mb-8">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                   <span className="text-gold-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                     Read Article <span>→</span>
                   </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
