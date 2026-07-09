import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ProductCard } from './ProductCard';
import type { Product } from '../../types';

const mockProduct: Product = {
  id: 1,
  name: 'Broccoli',
  price: 120,
  image: 'https://example.com/broccoli.jpg',
  category: 'vegetables',
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('ProductCard', () => {
  it('renders product name and price', () => {
    renderWithProvider(
      <ProductCard
        product={mockProduct}
        quantity={0}
        onAddToCart={vi.fn()}
        onQuantityChange={vi.fn()}
      />
    );

    expect(screen.getByText('Broccoli')).toBeInTheDocument();
    expect(screen.getByText('$120')).toBeInTheDocument();
  });

  it('increments quantity on + button click', () => {
    const onQuantityChange = vi.fn();

    renderWithProvider(
      <ProductCard
        product={mockProduct}
        quantity={0}
        onAddToCart={vi.fn()}
        onQuantityChange={onQuantityChange}
      />
    );

    fireEvent.click(screen.getByText('+'));

    expect(onQuantityChange).toHaveBeenCalledWith(1, 1);
  });

  it('decrements quantity on - button click', () => {
    const onQuantityChange = vi.fn();

    renderWithProvider(
      <ProductCard
        product={mockProduct}
        quantity={2}
        onAddToCart={vi.fn()}
        onQuantityChange={onQuantityChange}
      />
    );

    fireEvent.click(screen.getByText('-'));

    expect(onQuantityChange).toHaveBeenCalledWith(1, 1);
  });

  it('calls onAddToCart when Add to cart button is clicked', () => {
    const onAddToCart = vi.fn();

    renderWithProvider(
      <ProductCard
        product={mockProduct}
        quantity={2}
        onAddToCart={onAddToCart}
        onQuantityChange={vi.fn()}
      />
    );

    fireEvent.click(screen.getByText('Add to cart'));

    expect(onAddToCart).toHaveBeenCalledWith(mockProduct, 2);
  });
});