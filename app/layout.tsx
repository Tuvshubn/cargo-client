import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'МонтоТрейд | Солонгос-Монгол Карго',
  description: 'Солонгосоос Монгол руу найдвартай, хурдан тээвэр · 한국에서 몽골까지 빠른 배송',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800;900&family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
