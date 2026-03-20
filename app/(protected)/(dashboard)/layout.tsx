"use client";
import Header from "@/app/components/Header";
import SideNav from "@/app/components/SideNav";
import { AppShell, Burger, Group, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [opened, { toggle, close }] = useDisclosure();
  return (
    <AppShell
      layout="alt"
      padding="sm"
      header={{ height: { base: 50, sm: 60 } }}
      navbar={{
        width: { sm: 190 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header px="sm">
        <Group h="100%" align="center" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="center" style={{ flex: 1 }}>
            <Header />
          </Group>
          <Box w={28} />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar bg="#AEDD94">
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <SideNav closeNavbar={close} />
        </Group>
      </AppShell.Navbar>

      <AppShell.Main
        style={{ display: "flex", flexDirection: "column", minHeight: 0 }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
