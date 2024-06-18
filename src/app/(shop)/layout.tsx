import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import AppVersionScript from '@/components/AppVersionScript';
import CartStoreRehydrate from '@/components/CartStoreRehydrate';
import Navbar from '@/components/Navbar';
import TruendoScript from '@/components/TruendoScript';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'papirsarkany.hu - Papírsárkány, sárkány, anyagok',
  description: 'Papírsárkány árusítás 1984-óta.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="hu"
      className="scroll-pt-[68px] scroll-smooth sm:scroll-pt-[72px]"
    >
      <head>
        <TruendoScript />
        <AppVersionScript />
      </head>
      <body className={`${inter.className} `}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="grid flex-1 bg-sky-100 min-h-[calc(100dvh-68px)] sm:min-h-[calc(100dvh-72px)] lg:min-h-[calc(100dvh-76px)]">
            {children}
            <Analytics />
            <SpeedInsights />
            <CartStoreRehydrate />
          </main>
        </div>
      </body>
    </html>
  );
}
