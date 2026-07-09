import { Modal, ScrollArea, Group, Text, Button, Stack } from '@mantine/core';
import type { CartItem } from '../../types';

interface CartProps {
  opened: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: number) => void;
}

export function Cart({ opened, onClose, items, onRemoveItem }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Modal opened={opened} onClose={onClose} title="Shopping Cart" size="md">
      {items.length === 0 ? (
        <Text ta="center" c="dimmed">Your cart is empty</Text>
      ) : (
        <>
          <ScrollArea.Autosize mah={400} type="scroll">
            <Stack gap="sm">
              {items.map((item) => (
                <Group key={item.id} justify="space-between">
                  <Group>
                    <Text fw={500}>{item.name}</Text>
                    <Text c="dimmed">x{item.quantity}</Text>
                  </Group>
                  <Group>
                    <Text fw={700}>${(item.price * item.quantity).toFixed(2)}</Text>
                    <Button
                      size="xs"
                      variant="subtle"
                      color="red"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </Group>
                </Group>
              ))}
            </Stack>
          </ScrollArea.Autosize>

          <Group justify="space-between" mt="lg">
            <Text size="xl" fw={700}>Total:</Text>
            <Text size="xl" fw={700}>${total.toFixed(2)}</Text>
          </Group>

          <Button fullWidth mt="lg" color="green">
            Checkout
          </Button>
        </>
      )}
    </Modal>
  );
}