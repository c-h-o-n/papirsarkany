import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div className={`rounded-lg border-4 border-black bg-white ${className}`}>
      {children}
    </div>
  );
}
