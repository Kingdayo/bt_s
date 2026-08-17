import './globals.css';
import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The People Behind the Degree',
  description: 'A thank-you letter, written in code. A cinematic tribute from a Computer Science graduate to his parents.',
  openGraph: {
    title: 'The People Behind the Degree',
    description: 'A thank-you letter, written in code.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The People Behind the Degree',
    description: 'A thank-you letter, written in code.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans bg-ink text-ivory antialiased">{children}</body>
    </html>
  );
}
