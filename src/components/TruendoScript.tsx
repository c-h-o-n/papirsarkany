import Script from 'next/script';

import { isProdEnv } from '@/lib/helpers';

/**
 * Truendo is a Consent Management Platform.
 * I use this provider to meet the GDPR requirements.
 * It injects a cookie banner to my sites.
 * @returns Truendo banner integration script if NODE_ENV and VERCEL_ENV is production
 */
export default function TruendoScript() {
  if (!isProdEnv()) {
    return;
  }

  return (
    <Script
      id="truendoAutoBlock"
      type="text/javascript"
      src="https://cdn.priv.center/pc/truendo_cmp.pid.js"
      data-siteid="88306c5c-ce8c-45d7-8daf-47e99864c1b8"
    />
  );
}
