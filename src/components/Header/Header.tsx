import { Group, Text, Badge, Button } from '@mantine/core';

interface HeaderProps {
  cartItemsCount: number;
  cartTotalPrice: number;
  onCartClick: () => void;
}

export function Header({ cartItemsCount, cartTotalPrice, onCartClick }: HeaderProps) {
  return (
    <Group justify="space-between" style={{ padding: '16px 24px', backgroundColor: '#2F9E44', color: 'white' }}>
      <Group>
        <Text size="xl" fw={700}>
          Vegetable
        </Text>
        <Badge color="green" variant="light">
          NEW
        </Badge>
      </Group>
      <Button
        variant="white"
        color="green"
        onClick={onCartClick}
      >
        Cart: {cartItemsCount} (${cartTotalPrice.toFixed(2)})
      </Button>
    </Group>
  );
}