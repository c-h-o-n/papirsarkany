export {};

declare global {
  interface Window {
    Truendo?: {
      acceptAllCookies: () => void;
    };
    appVersion?: string;
  }
}
