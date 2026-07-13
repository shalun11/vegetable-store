import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import App from './App';
import { fetchProducts } from './api/products';
import type { Product } from './types';

vi.mock('./api/products', () => ({
  fetchProducts: vi.fn(),
}));

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
];

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loader initially', () => {
    vi.mocked(fetchProducts).mockImplementation(
      () => new Promise(() => {})
    );

    renderWithProvider(<App />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders product list after loading', async () => {
    vi.mocked(fetchProducts).mockResolvedValue(mockProducts);

    renderWithProvider(<App />);

    await waitFor(() => {
      expect(screen.getByText('Broccoli')).toBeInTheDocument();
    });

    expect(screen.getByText('Carrot')).toBeInTheDocument();
  });

  it('adds product to cart and updates header', async () => {
    vi.mocked(fetchProducts).mockResolvedValue(mockProducts);

    renderWithProvider(<App />);

    await waitFor(() => {
      expect(screen.getByText('Broccoli')).toBeInTheDocument();
    });

    const plusButtons = screen.getAllByText('+');
    fireEvent.click(plusButtons[0]);

    const addToCartButtons = screen.getAllByText('Add to cart');
    fireEvent.click(addToCartButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/Cart: 1/)).toBeInTheDocument();
    });
  });
});