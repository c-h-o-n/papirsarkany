export {};

declare global {
  interface Window {
    Truendo?: {
      acceptAllCookies: () => void;
    };
    appVersion?: string;
  }

  // FIX i18nIsDynamicList is getting picked up by TS LSP from node_modules
  namespace JSX {
    interface IntrinsicAttributes {
      i18nIsDynamicList?: never;
    }
  }
}
