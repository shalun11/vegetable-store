import { Center, Loader as MantineLoader } from '@mantine/core';

export function Loader() {
  return (
    <Center style={{ height: '100vh' }}>
      <MantineLoader size="xl" data-testid="loader" />
    </Center>
  );
}