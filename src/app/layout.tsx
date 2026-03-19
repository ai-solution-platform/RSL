import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Thai } from 'next/font/google';
import './globals.css';
import { AppShell } from './app-shell';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const notoSansThai = Noto_Sans_Thai({
  variable: '--font-noto-sans-thai',
  subsets: ['thai'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RSL - Retail Space Leasing',
  description: 'Find and lease retail spaces in Thailand',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${inter.variable} ${notoSansThai.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
