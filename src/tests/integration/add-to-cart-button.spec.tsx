import { render, renderHook, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import AddToCartButton from "~/components/add-to-cart-button";
import useCart from "~/hooks/use-cart";
import { useCartStore } from "~/store/use-cart-store";
import { kiteMock } from "../../mocks/product.mock";

test('Add to cart button has text "Kosárba"', () => {
  render(<AddToCartButton product={kiteMock} />);

  expect(screen.getByRole("button")).toBeDefined();
  expect(screen.getByRole("button").textContent).toBe("Kosárba");
});

test("Add to cart button increases item quantity in cart on click", () => {
  render(<AddToCartButton product={kiteMock} />);

  renderHook(() => useCartStore.setState({ cart: [] }));

  const button = screen.getByRole("button");

  button.click();
  button.click();

  const { result: useCartStoreResult } = renderHook(() =>
    useCartStore.getState(),
  );
  const { result: useCartHookResult } = renderHook(() => useCart());

  const { cart } = useCartStoreResult.current;

  expect(cart).toHaveLength(1);

  expect(useCartHookResult.current.getTotalItemCount()).toBe(2);
});
