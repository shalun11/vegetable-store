import { Card, Image, Text, Group, Button, ActionIcon } from '@mantine/core';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAddToCart: (product: Product, quantity: number) => void;
  onQuantityChange: (productId: number, quantity: number) => void;
}

export function ProductCard({ product, quantity, onAddToCart, onQuantityChange }: ProductCardProps) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <Card.Section>
        <Image
          src={product.image}
          height={160}
          alt={product.name}
          style={{ objectFit: 'cover' }}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{product.name}</Text>
        <Text fw={700}>${product.price}</Text>
      </Group>

      <Group justify="center" mt="md">
        <ActionIcon
          variant="outline"
          color="gray"
          onClick={() => onQuantityChange(product.id, Math.max(0, quantity - 1))}
        >
          -
        </ActionIcon>
        <Text>{quantity}</Text>
        <ActionIcon
          variant="outline"
          color="gray"
          onClick={() => onQuantityChange(product.id, quantity + 1)}
        >
          +
        </ActionIcon>
      </Group>

      <Button
        fullWidth
        mt="md"
        radius="md"
        color="green"
        onClick={() => onAddToCart(product, quantity)}
      >
        Add to cart
      </Button>
    </Card>
  );
}