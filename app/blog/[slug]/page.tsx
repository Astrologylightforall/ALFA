import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ReadingProgress from '@/components/ui/ReadingProgress';

export function generateStaticParams() {
  const blogsDirectory = path.join(process.cwd(), 'content/blog');
  let files: string[] = [];
  try {
    files = fs.readdirSync(blogsDirectory);
  } catch(e) {}

  return files.map((filename) => ({
    slug: filename.replace('.md', '')
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blogsDirectory = path.join(process.cwd(), 'content/blog');
  const filePath = path.join(blogsDirectory, `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    return { title: 'Not Found' };
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);

  return {
    title: `${data.title} | ALFA Blog`,
    description: data.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blogsDirectory = path.join(process.cwd(), 'content/blog');
  const filePath = path.join(blogsDirectory, `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return (
    <>
      <ReadingProgress />
      <article className="min-h-screen bg-secondary-bg px-4 py-24 relative z-10 border-t border-border-accent">
        
        {/* Background glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-primary/5 rounded-full filter blur-[150px] pointer-events-none -z-10" />

        <div className="max-w-3xl mx-auto space-y-6 mt-16 relative z-10">
          <div className="space-y-6 text-center pb-12 border-b border-border-accent/40">
            <div className="flex items-center justify-center gap-3 text-xs md:text-sm">
              <span className="text-gold-primary font-bold uppercase tracking-widest">{data.category || 'Astrology'}</span>
              <span className="text-muted-text">—</span>
              <span className="text-cream/80">{data.date}</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
              {data.title}
            </h1>
            
            {data.author && (
              <p className="text-[13px] text-muted-text uppercase tracking-widest font-semibold pt-4">
                By {data.author}
              </p>
            )}
          </div>

          {/* MDX Content */}
          <div className="prose prose-invert prose-gold max-w-none pt-10 pb-20 font-body text-cream/85 text-[15.5px] md:text-[17px] leading-[1.8] 
            prose-headings:font-display prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight 
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:mb-6 prose-p:leading-[1.8]
            prose-a:text-gold-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-bold
            prose-ul:my-6 prose-ul:space-y-2
            prose-li:marker:text-gold-primary
            prose-blockquote:border-l-4 prose-blockquote:border-gold-primary prose-blockquote:bg-surface/30 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:text-gold-light prose-blockquote:font-display prose-blockquote:italic prose-blockquote:text-xl
          ">
            <MDXRemote source={content} />
          </div>
        </div>
      </article>
    </>
  );
}
