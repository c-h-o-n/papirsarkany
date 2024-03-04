import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import getConfig from 'next/config';

import './globals.css';
import Navbar from '@/components/Navbar';
import CartStoreRehydrate from '@/components/CartStoreRehydrate';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'papirsarkany.hu - Papírsárkány, sárkány, anyagok',
  description: 'Papírsárkány árusítás 1984-óta.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { publicRuntimeConfig } = getConfig();

  return (
    <html
      lang="hu"
      className="scroll-pt-[68px] scroll-smooth sm:scroll-pt-[72px]"
      data-app-version={publicRuntimeConfig.appVersion}
    >
      <Script
        id="truendoAutoBlock"
        type="text/javascript"
        src="https://cdn.priv.center/pc/truendo_cmp.pid.js"
        data-siteid="88306c5c-ce8c-45d7-8daf-47e99864c1b8"
      />
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
