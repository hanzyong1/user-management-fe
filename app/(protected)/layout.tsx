"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/lib/useAuth";
import { useRouter } from "next/navigation";
import { Center, Loader } from "@mantine/core";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  type AuthState = {
    loading: boolean;
    authenticated: boolean;
  };

  const { loading, authenticated } = useAuth() as AuthState;

  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.replace("/login");
    }
  }, [loading, authenticated, router]);

  if (loading) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  if (!authenticated) {
    return null; // prevent rendering children while redirecting
  }

  return <>{children}</>;
}
