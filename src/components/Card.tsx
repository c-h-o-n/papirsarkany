import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Card({ children }: Props) {
  return <div className="rounded-lg border-4 border-black  bg-white p-5">{children}</div>;
}
