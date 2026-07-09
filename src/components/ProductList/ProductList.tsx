import { SimpleGrid } from '@mantine/core';
import type { Product } from '../../types';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductListProps {
  products: Product[];
  quantities: Record<number, number>;
  onAddToCart: (product: Product, quantity: number) => void;
  onQuantityChange: (productId: number, quantity: number) => void;
}

export function ProductList({ products, quantities, onAddToCart, onQuantityChange }: ProductListProps) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" p="lg">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={quantities[product.id] || 0}
          onAddToCart={onAddToCart}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </SimpleGrid>
  );
}