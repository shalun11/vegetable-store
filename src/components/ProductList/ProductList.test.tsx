import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ProductList } from './ProductList';
import type { Product } from '../../types';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Broccoli',
    price: 120,
    image: 'https://example.com/broccoli.jpg',
    category: 'vegetables',
  },
  {
    id: 2,
    name: 'Carrot',
    price: 82,
    image: 'https://example.com/carrot.jpg',
    category: 'vegetables',
  },
  {
    id: 3,
    name: 'Tomato',
    price: 95,
    image: 'https://example.com/tomato.jpg',
    category: 'vegetables',
  },
];

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('ProductList', () => {
  it('renders list of products', () => {
    renderWithProvider(
      <ProductList
        products={mockProducts}
        quantities={{}}
        onAddToCart={vi.fn()}
        onQuantityChange={vi.fn()}
      />
    );

    expect(screen.getByText('Broccoli')).toBeInTheDocument();
    expect(screen.getByText('Carrot')).toBeInTheDocument();
    expect(screen.getByText('Tomato')).toBeInTheDocument();
  });

  it('renders correct number of products', () => {
    renderWithProvider(
      <ProductList
        products={mockProducts}
        quantities={{}}
        onAddToCart={vi.fn()}
        onQuantityChange={vi.fn()}
      />
    );

    const productCards = screen.getAllByText(/Add to cart/i);
    expect(productCards).toHaveLength(3);
  });

  it('displays product prices', () => {
    renderWithProvider(
      <ProductList
        products={mockProducts}
        quantities={{}}
        onAddToCart={vi.fn()}
        onQuantityChange={vi.fn()}
      />
    );

    expect(screen.getByText('$120')).toBeInTheDocument();
    expect(screen.getByText('$82')).toBeInTheDocument();
    expect(screen.getByText('$95')).toBeInTheDocument();
  });
});