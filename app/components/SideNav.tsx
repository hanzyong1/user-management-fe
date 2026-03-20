import { Box, NavLink, Image, Space, Text, Button, Stack } from "@mantine/core";
import Link from "next/link";
import NextImage from "next/image";
import TestLogo from "@/public/test.png";
import { IconLogout } from "@tabler/icons-react";
import { paths } from "@/app/routes";
import api from "@/app/lib/axios";
import { useRouter } from "next/navigation";

type SideNavProps = {
  closeNavbar: () => void;
};

export default function SideNav({ closeNavbar }: SideNavProps) {
  const router = useRouter();

  // Navigation paths
  const items = paths.map((path) => {
    return (
      <NavLink
        component={Link}
        href={path.path}
        key={path.pathName}
        label={path.pathName}
        fw="bold"
        leftSection={<path.icon size={16} stroke={1.5} />}
        onClick={closeNavbar}
      />
    );
  });

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.warn("Server logout failed", err);
    }

    closeNavbar();
    router.push("/login");
  };

  return (
    <Stack p="lg" h="100%" justify="space-between">
      <div>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Image
            component={NextImage}
            src={TestLogo}
            alt="Test Logo"
            w="60%"
            h="auto"
            fit="contain"
            priority
          />
        </Box>

        <Space h="md" />
        <Box>{items}</Box>
      </div>
      <Box style={{ position: "absolute", bottom: 20 }}>
        <Button
          variant="transparent"
          c="#828282"
          leftSection={<IconLogout size={14} />}
          onClick={handleLogout}
        >
          <Text size="xs" fw="bold">
            Logout
          </Text>
        </Button>
      </Box>
    </Stack>
  );
}
