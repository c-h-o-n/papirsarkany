import { FC, ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`rounded-lg border-4 border-black bg-white ${className}`}>
      {children}
    </div>
  );
};

export default Card;
