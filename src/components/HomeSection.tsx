import React, { ReactNode } from 'react';

type IconProps = {
  children: ReactNode;
};

type ContentProps = {
  children: ReactNode;
};

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
};

const HomeSection = (props: Props) => {
  let Icon: ReactNode | null = null;
  let Content: ReactNode | null = null;

  React.Children.forEach(props.children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === HomeSection.Icon) {
        Icon = child;
      } else if (child.type === HomeSection.Content) {
        Content = child;
      }
    }
  });

  return (
    <section id={props.id} className={`py-12 ${props.className}`}>
      {Icon && <div className='flex justify-center px-12 pb-12'>{Icon}</div>}

      <div className='space-y-8'>{Content}</div>
    </section>
  );
};

const Icon = (props: IconProps) => (
  <div className='max-w-[12rem] flex-1'>{props.children}</div>
);
const Content = (props: ContentProps) => <>{props.children}</>;

HomeSection.Icon = Icon;
HomeSection.Content = Content;

export default HomeSection;
