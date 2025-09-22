import './globals.css';
import { JetBrains_Mono } from 'next/font/google';
import Footer from '@/components/Footer';
import Script from 'next/script';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  variable: '--font-jetbrains-mono'
});

export const metadata = {
  title: 'Headbanger Blogs',
  description: 'Discover insightful articles about technology, programming, and development by Saurabh Sharma | Headbanger',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jetbrainsMono.className}>
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
        <Footer />
      </body>
    </html>
  );
}
