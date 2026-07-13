import { ScrollArea, Group, Text, ActionIcon, Stack } from '@mantine/core';
import type { CartItem } from '../../types';

interface CartProps {
  items: CartItem[];
  onRemoveItem: (productId: number) => void;
  onQuantityChange: (productId: number, quantity: number) => void;
}

export function Cart({ items, onRemoveItem, onQuantityChange }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrement = (item: CartItem) => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleDecrement = (item: CartItem) => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  if (items.length === 0) {
    return (
      <Text ta="center" c="dimmed" size="sm" py="md">
        Your cart is empty
      </Text>
    );
  }

  return (
    <div>
      <ScrollArea.Autosize mah={300} type="scroll">
        <Stack gap="xs">
          {items.map((item) => (
            <Group key={item.id} justify="space-between" align="center">
              <Group gap="xs">
                <Text size="sm" fw={500}>{item.name}</Text>
              </Group>
              <Group gap="xs">
                <ActionIcon
                  size="xs"
                  variant="outline"
                  color="gray"
                  onClick={() => handleDecrement(item)}
                  disabled={item.quantity <= 1}
                >
                  −
                </ActionIcon>
                <Text size="sm" fw={700} style={{ minWidth: '20px', textAlign: 'center' }}>
                  {item.quantity}
                </Text>
                <ActionIcon
                  size="xs"
                  variant="outline"
                  color="green"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </ActionIcon>
              </Group>
              <Group gap="xs">
                <Text size="sm" fw={700}>${(item.price * item.quantity).toFixed(2)}</Text>
                <ActionIcon
                  size="xs"
                  variant="subtle"
                  color="red"
                  onClick={() => onRemoveItem(item.id)}
                  title="Remove"
                >
                  ✕
                </ActionIcon>
              </Group>
            </Group>
          ))}
        </Stack>
      </ScrollArea.Autosize>

      <Group justify="space-between" mt="sm" pt="sm" style={{ borderTop: '1px solid #e9ecef' }}>
        <Text size="sm" fw={700}>Total:</Text>
        <Text size="sm" fw={700}>${total.toFixed(2)}</Text>
      </Group>
    </div>
  );
}