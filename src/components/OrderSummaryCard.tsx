"use client";

import Image from "next/image";
import { Fragment } from "react";

import { CartItem } from "@/lib/types";
import { currencyFormatter } from "@/lib/formatters";
import { useCartStore } from "@/store/useCartStore";
import Card from "./Card";
import ProductinCartCounter from "./ProductInCartCounter";
import TrashCanIcon from "@/assets/trash-can.svg";
import { MISSING_IMG_URL } from "@/lib/constants";

type Props = {
  layout?: "full" | "simplified" | "definitive";
};
export default function OrderSummaryCard({ layout = "full" }: Props) {
  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const totalItems = useCartStore((state) => state.totalItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const onDeleteClick = (product: CartItem) => {
    removeFromCart(product);
  };

  if (cart.length < 1) {
    return (
      <div className="text-center">
        <h1>Üres a kosarad.</h1>
      </div>
    );
  }

  if (layout === "definitive") {
    return (
      <Card className="flex flex-1 flex-col gap-4 p-8">
        {cart.map((item) => (
          <Fragment key={item._id}>
            <div className="flex items-center justify-between">
              <div className="flex  gap-2">
                <div>
                  {item.image && (
                    <Image
                      src={item.image.asset?.url || MISSING_IMG_URL}
                      alt={item.name}
                      width={128}
                      height={128}
                      placeholder="blur"
                      blurDataURL={item.image.asset?.metadata?.blurHash}
                      className="h-auto max-h-32 min-h-24 w-32 rounded-lg object-contain"
                    />
                  )}
                </div>

                <div>
                  <h3 className="font-bold">{item.name}</h3>

                  <span className="text-sm font-normal text-gray-400">
                    {item.quantity} db
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {item.price && (
                  <h3 className="font-bold">
                    {currencyFormatter(item.price * item.quantity)}
                  </h3>
                )}
              </div>
            </div>
            <div className="d-divider"></div>
          </Fragment>
        ))}

        <div className="flex justify-between font-bold">
          <h3>
            Összesen{" "}
            <span className="text-base font-normal text-gray-400">
              {totalItems} db
            </span>
          </h3>
          <h3>{currencyFormatter(totalPrice)}</h3>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-1 flex-col gap-4 p-8">
      {cart.map((item) => (
        <Fragment key={item._id}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
              {item.image && (
                <Image
                  src={item.image.asset?.url || MISSING_IMG_URL}
                  alt={item.name}
                  width={128}
                  height={128}
                  placeholder="blur"
                  blurDataURL={item.image.asset?.metadata?.blurHash}
                  className="h-auto max-h-32 min-h-24 w-32 rounded-lg object-contain"
                />
              )}

              <div>
                <h3 className="font-bold">{item.name}</h3>
                {item.price && (
                  <h4 className="block font-bold md:hidden">
                    {currencyFormatter(item.price * item.quantity)}
                  </h4>
                )}
              </div>
            </div>
            <div className="hidden flex-1 items-center justify-end gap-4 md:flex ">
              {item.price && (
                <h4 className=" font-bold">
                  {currencyFormatter(item.price * item.quantity)}
                </h4>
              )}

              <div>
                <ProductinCartCounter value={item.quantity} cartItem={item} />
              </div>

              <button
                className="d-btn d-btn-square d-btn-error"
                onClick={() => onDeleteClick(item)}
              >
                <TrashCanIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="flex justify-between gap-4 md:hidden">
            <ProductinCartCounter value={item.quantity} cartItem={item} />

            <button
              className="d-btn d-btn-square d-btn-error"
              onClick={() => onDeleteClick(item)}
            >
              <TrashCanIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="d-divider"></div>
        </Fragment>
      ))}

      <div className="flex justify-between font-bold">
        <h3>
          Összesen{" "}
          <span className="text-base font-normal text-gray-400">
            {totalItems} db
          </span>
        </h3>
        <h3>{currencyFormatter(totalPrice)}</h3>
      </div>
    </Card>
  );
}
