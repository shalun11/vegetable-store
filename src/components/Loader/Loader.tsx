import { Loader as MantineLoader, Center } from '@mantine/core';

export function Loader() {
  return (
    <Center style={{ height: '100vh' }}>
      <MantineLoader size="xl" />
    </Center>
  );
}