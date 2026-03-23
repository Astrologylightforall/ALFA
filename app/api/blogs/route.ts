import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOGS_DIR = path.join(process.cwd(), 'content', 'blog');

// GET: List all blog posts
export async function GET() {
  try {
    if (!fs.existsSync(BLOGS_DIR)) {
      return NextResponse.json({ success: true, blogs: [] });
    }

    const files = fs.readdirSync(BLOGS_DIR);
    const blogs = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const fullPath = path.join(BLOGS_DIR, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Very basic frontmatter parser (extracts title, date)
        const titleMatch = fileContents.match(/title:\s*['"]?(.*?)['"]?\n/);
        const dateMatch = fileContents.match(/date:\s*['"]?(.*?)['"]?\n/);
        const publishedMatch = fileContents.match(/published:\s*(true|false)/);
        
        const slug = file.replace(/\.md$/, '');
        
        return {
          slug,
          filename: file,
          title: titleMatch ? titleMatch[1] : slug,
          date: dateMatch ? dateMatch[1] : 'Unknown Date',
          published: publishedMatch ? publishedMatch[1] === 'true' : true,
          size: fs.statSync(fullPath).size
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to read blogs directory' }, { status: 500 });
  }
}

// POST: Create a new blog post
export async function POST(request: Request) {
  try {
    const { title, slug, date, content, published, image } = await request.json();
    
    if (!title || !slug) {
      return NextResponse.json({ success: false, message: 'Title and Slug are required' }, { status: 400 });
    }

    // Ensure directory exists
    if (!fs.existsSync(BLOGS_DIR)) {
      fs.mkdirSync(BLOGS_DIR, { recursive: true });
    }

    const filePath = path.join(BLOGS_DIR, `${slug}.md`);

    // Guard against overwriting existing slug accidentally
    if (fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, message: 'A blog post with this slug already exists.' }, { status: 400 });
    }

    const markdownBody = `---
title: "${title}"
date: "${date || new Date().toISOString().split('T')[0]}"
image: "${image || '/images/blog1.jpg'}"
published: ${published !== undefined ? published : true}
---

${content || 'Start drafting your post here...'}
`;

    fs.writeFileSync(filePath, markdownBody, 'utf8');

    return NextResponse.json({ success: true, message: 'Blog created successfully', slug });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to create blog post' }, { status: 500 });
  }
}
