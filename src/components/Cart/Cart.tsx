import {
  Drawer,
  ScrollArea,
  Group,
  Text,
  Button,
  Stack,
  ActionIcon
} from '@mantine/core';
import type { CartItem } from '../../types';

interface CartProps {
  opened: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: number) => void;
  onQuantityChange: (productId: number, quantity: number) => void;
}

export function Cart({
  opened,
  onClose,
  items,
  onRemoveItem,
  onQuantityChange
}: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrement = (item: CartItem) => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleDecrement = (item: CartItem) => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Shopping Cart"
      position="right"
      size="md"
      padding="lg"
    >
      {items.length === 0 ? (
        <Text ta="center" c="dimmed" mt="xl">Your cart is empty</Text>
      ) : (
        <>
          <ScrollArea.Autosize mah={500} type="scroll">
            <Stack gap="sm">
              {items.map((item) => (
                <Group
                  key={item.id}
                  justify="space-between"
                  align="flex-start"
                  style={{
                    padding: '12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px'
                  }}
                >
                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Text fw={500}>{item.name}</Text>
                    <Text size="sm" c="dimmed">
                      ${item.price.toFixed(2)} / unit
                    </Text>
                  </Stack>

                  <Stack gap="xs" align="flex-end">
                    <Group gap="xs">
                      <ActionIcon
                        size="sm"
                        variant="outline"
                        color="gray"
                        onClick={() => handleDecrement(item)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </ActionIcon>
                      <Text fw={700} style={{ minWidth: '30px', textAlign: 'center' }}>
                        {item.quantity}
                      </Text>
                      <ActionIcon
                        size="sm"
                        variant="outline"
                        color="green"
                        onClick={() => handleIncrement(item)}
                      >
                        +
                      </ActionIcon>
                    </Group>
                    <Group gap="xs">
                      <Text fw={700}>${(item.price * item.quantity).toFixed(2)}</Text>
                      <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="red"
                        onClick={() => onRemoveItem(item.id)}
                        title="Remove"
                      >

                      </ActionIcon>
                    </Group>
                  </Stack>
                </Group>
              ))}
            </Stack>
          </ScrollArea.Autosize>

          <Group justify="space-between" mt="lg" pt="lg" style={{ borderTop: '2px solid #e9ecef' }}>
            <Text size="xl" fw={700}>Total:</Text>
            <Text size="xl" fw={700}>${total.toFixed(2)}</Text>
          </Group>

          <Button fullWidth mt="lg" color="green" size="lg">
            Checkout
          </Button>
        </>
      )}
    </Drawer>
  );
}