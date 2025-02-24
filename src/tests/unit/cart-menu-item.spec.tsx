import { cleanup, render, renderHook, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import CartMenuItem from "~/components/cart-menu-item";
import useCart from "~/hooks/use-cart";
import { product } from "~/mocks/product.mock";
import { useCartStore } from "~/store/use-cart-store";

afterEach(cleanup);

test("should render with correct numberof of total cart items", () => {
  renderHook(() =>
    useCartStore.setState({
      cart: [
        {
          ...product,
          quantity: 2,
        },
      ],
    }),
  );

  renderHook(() => useCart());

  render(<CartMenuItem />);

  expect(screen.getByTestId("cart-menu-item-total-count").textContent).toBe(
    "2",
  );
});

test("should rendered as a link to the cart page", () => {
  renderHook(() =>
    useCartStore.setState({
      cart: [
        {
          ...product,
          quantity: 2,
        },
      ],
    }),
  );

  render(<CartMenuItem />);

  expect(screen.getByRole("link").getAttribute("href")).toBe("/kosar");
});
