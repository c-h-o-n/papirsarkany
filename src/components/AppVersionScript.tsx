'use client';
import appVersion from '@/lib/app-version.preval';
import Script from 'next/script';

export default function AppVersionScript() {
  return (
    <Script id="appVersionInject">
      {`window.appVersion = "${appVersion}";`}
    </Script>
  );
}
