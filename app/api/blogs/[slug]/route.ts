import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOGS_DIR = path.join(process.cwd(), 'content', 'blog');
const getFilePath = (slug: string) => path.join(BLOGS_DIR, `${slug}.md`);

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const filePath = getFilePath(params.slug);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, 'utf8');
    return NextResponse.json({ success: true, content });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to read file' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { content } = await request.json();
    const filePath = getFilePath(params.slug);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }

    fs.writeFileSync(filePath, content, 'utf8');
    return NextResponse.json({ success: true, message: 'Blog updated successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update file' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const filePath = getFilePath(params.slug);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }

    fs.unlinkSync(filePath);
    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete file' }, { status: 500 });
  }
}
