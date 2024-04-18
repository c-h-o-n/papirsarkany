import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import getConfig from 'next/config';

import './globals.css';
import Navbar from '@/components/Navbar';
import CartStoreRehydrate from '@/components/CartStoreRehydrate';
import TruendoScript from '@/components/TruendoScript';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'papirsarkany.hu - Papírsárkány, sárkány, anyagok',
  description: 'Papírsárkány árusítás 1984-óta.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const { publicRuntimeConfig } = getConfig();

  return (
    <html
      lang="hu"
      className="scroll-pt-[68px] scroll-smooth sm:scroll-pt-[72px]"
      data-app-version={publicRuntimeConfig.appVersion}
    >
      <head>
        <TruendoScript />
      </head>
      <body className={`${inter.className} `}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="grid flex-1 bg-sky-100">
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
