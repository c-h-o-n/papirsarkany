import Script from 'next/script';
import { FC } from 'react';

import appVersion from '~/lib/app-version.preval';

const AppVersionScript: FC = () => {
  return (
    <Script id="appVersionInject">
      {`window.appVersion = "${appVersion}";`}
    </Script>
  );
};

export default AppVersionScript;
