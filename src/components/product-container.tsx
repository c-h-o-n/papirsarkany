import type { FC, ReactNode } from "react";

type ProductContainerProps = {
  children: ReactNode;
};

const ProductContainer: FC<ProductContainerProps> = ({ children }) => {
  return (
    <div className='grid grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-3'>
      {children}
    </div>
  );
};

export default ProductContainer;
