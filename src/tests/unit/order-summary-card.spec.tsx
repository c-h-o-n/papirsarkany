import { cleanup, render, renderHook, screen } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import OrderSummaryCard from '~/components/order-summary-card';
import { product } from '~/mocks/product.mock';
import { useCartStore } from '~/store/use-cart-store';

afterEach(cleanup);

test('should render "Üres a kosarad" when cart is empty', () => {
  renderHook(() => useCartStore.setState({ cart: [] }));

  const { container } = render(<OrderSummaryCard />);

  expect(screen.getByText('Üres a kosarad.')).toBeDefined();
  expect(container).toMatchSnapshot();
});

test('should render "definitive" layout when provided', () => {
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

  const { container } = render(<OrderSummaryCard layout="definitive" />);
  expect(screen.queryByTestId('cart-item-controls')).toBeNull();
  expect(container).toMatchSnapshot();
});

test('should render "full" layout by default', () => {
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

  const { container } = render(<OrderSummaryCard />);
  expect(screen.queryByTestId('cart-item-controls')).toBeDefined();
  expect(container).toMatchSnapshot();
});