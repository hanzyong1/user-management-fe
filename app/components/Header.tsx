"use client";

import { usePathname } from "next/navigation";
import { Box, Group, Text } from "@mantine/core";
import { paths } from "@/app/routes";

export default function Header() {
  const pathname = usePathname();

  const currentPath = paths.find((p) => pathname.startsWith(p.path));

  const title = currentPath ? currentPath.pathName : pathname;

  return (
    <Box p="sm" w="100%" px="lg">
      <Group justify="space-between">
        <Text size="xl" fw="bold">
          {title}
        </Text>
      </Group>
    </Box>
  );
}
