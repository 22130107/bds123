import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try to find the file in .uploads first
  let filePath = join(process.cwd(), '.uploads', slug);
  
  // Fallback to public/uploads if not found
  if (!existsSync(filePath)) {
    filePath = join(process.cwd(), 'public', 'uploads', slug);
  }

  if (!existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const file = readFileSync(filePath);
  
  // Basic content type detection
  const ext = filePath.split('.').pop()?.toLowerCase();
  let contentType = 'application/octet-stream';
  if (ext === 'png') contentType = 'image/png';
  else if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
  else if (ext === 'gif') contentType = 'image/gif';
  else if (ext === 'svg') contentType = 'image/svg+xml';
  else if (ext === 'webp') contentType = 'image/webp';
  else if (ext === 'avif') contentType = 'image/avif';

  return new NextResponse(file, {
    headers: {
      'Content-Type': contentType,
    },
  });
}
