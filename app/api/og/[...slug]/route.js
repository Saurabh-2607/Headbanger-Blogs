export const runtime = 'edge';

import { ImageResponse } from 'next/og';

async function loadGoogleFont(font, text) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error('failed to load font data');
}

export async function GET(request, { params }) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const titleParam = searchParams.get('title');

  let title;
  if (titleParam) {
    title = decodeURIComponent(titleParam);
  } else {
    // Derive from slug
    const slugPart = slug[slug.length - 1];
    title = slugPart.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  // Load JetBrains Mono font for the title
  const fontData = await loadGoogleFont('JetBrains+Mono:wght@400;600;700', title + ' Headbanger Blogs by Saurabh Sharma');

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          color: '#fefefe', // hsl(0 0% 98%) - white text
          background: '#0a0a0a', // hsl(0 0% 3.9%) - very dark background
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'JetBrains Mono',
          border: '1px solid #262626', // hsl(0 0% 14.9%) - border color
        }}
      >
        <div
          style={{
            fontSize: 32,
            marginBottom: 20,
            color: '#a1a1aa', // hsl(0 0% 63.9%) - muted text
            fontWeight: '400',
          }}
        >
          Headbanger Blogs
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: '700',
            lineHeight: 1.2,
            whiteSpace: 'pre-wrap',
            color: '#fefefe',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            marginTop: 20,
            color: '#a1a1aa', // muted text
            opacity: 0.8,
            fontWeight: '400',
          }}
        >
          by Saurabh Sharma
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'JetBrains Mono',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'JetBrains Mono',
          data: fontData,
          style: 'normal',
          weight: 600,
        },
        {
          name: 'JetBrains Mono',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    },
  );
}