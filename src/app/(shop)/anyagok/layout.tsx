import { ReactNode } from 'react';

export default function MaterialLayout({ children }: { children: ReactNode }) {
  return <div className='material-pattern'>{children}</div>;
}
