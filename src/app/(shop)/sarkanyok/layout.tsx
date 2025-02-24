import type { ReactNode } from 'react';

export default function KiteLayout({ children }: { children: ReactNode }) {
  return <div className="kite-pattern">{children}</div>;
}
