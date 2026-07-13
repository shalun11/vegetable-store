import { useState } from 'react';
import { Group, Text, Badge, Button, Popover } from '@mantine/core';
import { Cart } from '../Cart/Cart';

interface HeaderProps {
  cartItemsCount: number;
  cartItems: any[];
  onRemoveItem: (productId: number) => void;
  onQuantityChange: (productId: number, quantity: number) => void;
}

export function Header({
  cartItemsCount,
  cartItems,
  onRemoveItem,
  onQuantityChange
}: HeaderProps) {
  const [opened, setOpened] = useState(false); // Добавляем состояние

  return (
    <Group justify="space-between" style={{ padding: '16px 24px', backgroundColor: '#2F9E44', color: 'white' }}>
      <Group>
        <Text size="xl" fw={700}>
          Vegetable
        </Text>
        <Badge color="green" variant="light">
          SHOP
        </Badge>
      </Group>

      <Popover
        position="bottom-end"
        width={320}
        opened={opened}
        onChange={setOpened}
      >
        <Popover.Target>
          <Button
            variant="white"
            color="green"
            onClick={() => setOpened(!opened)} // Добавляем обработчик
          >
            🛒 Cart: {cartItemsCount}
          </Button>
        </Popover.Target>

        <Popover.Dropdown>
          <Cart
            items={cartItems}
            onRemoveItem={onRemoveItem}
            onQuantityChange={onQuantityChange}
          />
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
}