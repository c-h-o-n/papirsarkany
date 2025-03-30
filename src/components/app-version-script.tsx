import Script from "next/script";
import type { FC } from "react";
import packageJSON from "../../package.json";

const AppVersionScript: FC = () => {
  return (
    <Script id="appVersionInject">
      {`window.appVersion = "${packageJSON.version}";`}
    </Script>
  );
};

export default AppVersionScript;
