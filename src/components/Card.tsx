import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Card({ children }: Props) {
  return <div className="bg-white p-5 border-4  rounded-lg border-black">{children}</div>;
}
