"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import api from "@/app/lib/axios";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Stack,
  Box,
  Text,
  Image,
  Anchor,
} from "@mantine/core";
import NextImage from "next/image";
import TestLogo from "@/public/test.png";
import { useAuth } from "@/app/lib/useAuth";
import { useDisclosure } from "@mantine/hooks";
import RegisterModal from "@/app/components/RegisterModal";

type AuthState = {
  loading: boolean;
  authenticated: boolean;
};

export default function Login() {
  const [opened, { open, close }] = useDisclosure(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const router = useRouter();
  const { loading, authenticated } = useAuth() as AuthState;

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && authenticated) {
      router.replace("/profile");
    }
  }, [loading, authenticated, router]);

  if (loading || authenticated) return null;

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setLoginError(null);
    setSubmitting(true);

    try {
      await api.post("/auth/login", { email, password });
      router.push("/profile");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      setLoginError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.currentTarget.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value);

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundImage: "url('/login-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          maxWidth: "700px",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            width: "100%",
            padding: "2rem",
            backgroundColor: "rgba(229, 231, 235, 0.7)",
            borderRadius: "10px",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              component={NextImage}
              src={TestLogo}
              alt="Test Logo"
              style={{
                width: 250,
                height: 250,
                objectFit: "contain",
                paddingTop: 16,
              }}
              priority
            />
          </Box>

          <Paper
            shadow="sm"
            radius="md"
            p="md"
            style={{
              backgroundColor: "rgba(200, 200, 200, 0.9)",
              width: "300px",
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <form onSubmit={(e) => handleSubmit(e.nativeEvent as SubmitEvent)}>
              <Stack gap="md">
                <TextInput
                  label="Email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />

                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />

                <Anchor
                  underline="always"
                  component="button"
                  type="button"
                  size="sm"
                  onClick={open}
                >
                  Not a user? Register here!
                </Anchor>

                {loginError && (
                  <Text c="red" size="sm">
                    {loginError}
                  </Text>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="outline"
                  color="black"
                  loading={submitting}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Paper>
        </Box>

        {/* User registration modal */}
        <RegisterModal opened={opened} onClose={close} />
      </Box>
    </Box>
  );
}
