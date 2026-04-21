import './globals.css';
import { Instrument_Serif, DM_Mono, Geist } from 'next/font/google';
import Footer from '@/components/Footer';
import { Analytics } from "@vercel/analytics/next"
import Script from 'next/script';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist'
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif'
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-mono'
});

export const metadata = {
  title: 'Headbanger Blogs',
  description: 'Discover insightful articles about technology, programming, and development by Saurabh Sharma | Headbanger',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark overflow-x-hidden ${instrumentSerif.variable} ${dmMono.variable} ${geist.variable}`}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JVF6B4TQM4"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JVF6B4TQM4');
          `}
        </Script>
      </head>
      <body>
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
