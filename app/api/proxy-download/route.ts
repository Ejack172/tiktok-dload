import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  const filename = req.nextUrl.searchParams.get('filename') || `tiktok_download_${Date.now()}.mp4`;
  
  if (!url) {
    return new NextResponse('Missing URL', { status: 400 });
  }

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.statusText}`);
    }

    const headers = new Headers();
    // Copy the content type from the original response
    headers.set('Content-Type', response.headers.get('Content-Type') || 'application/octet-stream');
    // Force the browser to download the file instead of playing it
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);

    // Return the response body as a stream
    return new NextResponse(response.body, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Download proxy error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
