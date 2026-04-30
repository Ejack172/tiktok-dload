import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  
  if (!url) {
    return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
  }
  
  try {
    // Using a free TikTok API (tikwm) that doesn't require an API key
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.code !== 0) {
      return NextResponse.json(
        { success: false, error: data.msg || 'Failed to fetch video data' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      downloadLink: data.data.play, // HD video URL without watermark
      musicLink: data.data.music,
      wmLink: data.data.wmplay,
      captions: data.data.title,
      metadata: {
        title: data.data.title,
        author: data.data.author?.unique_id || data.data.author?.nickname || 'Unknown Author',
        thumbnail: data.data.cover,
        duration: data.data.duration
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
