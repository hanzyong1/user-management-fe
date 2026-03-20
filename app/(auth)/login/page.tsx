"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
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
  Image,
} from "@mantine/core";
import NextImage from "next/image";
import TestLogo from "@/public/test.png";
import { useAuth } from "@/app/lib/useAuth";

type AuthState = {
  loading: boolean;
  authenticated: boolean;
};

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

    try {
      await api.post("/auth/login", { email, password });
      router.push("/profile");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      alert(
        "Login failed: " + (error.response?.data?.message || error.message),
      );
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
                <Button type="submit" fullWidth variant="outline" color="black">
                  Login
                </Button>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
