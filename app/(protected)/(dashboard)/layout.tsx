"use client";

import Header from "@/app/components/Header";
import SideNav from "@/app/components/SideNav";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      padding="sm"
      header={{ height: { sm: 50 } }}
      navbar={{
        width: { sm: 190 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Group h="100%">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Header />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar bg="#AEDD94">
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <SideNav />
        </Group>
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          minHeight: 0,
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
