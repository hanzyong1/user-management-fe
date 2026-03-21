"use client";

import {
  Center,
  Stack,
  TextInput,
  Image,
  Box,
  Button,
  Group,
  Text,
} from "@mantine/core";
import { useEffect, useState, ChangeEvent } from "react";
import NextImage from "next/image";
import NullProfilePic from "@/public/null profile pic.jpg";
import api from "@/app/lib/axios";
import { notifications } from "@mantine/notifications";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

// User type
type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  profilePicPath: string | null;
};

export default function ProfilePage() {
  const [form, setForm] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    profilePicPath: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [originalForm, setOriginalForm] = useState<UserProfile | null>(null);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get<UserProfile>("/user/profile");
        setForm(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchData();
  }, []);

  // Generic handler for updating form fields
  const handleChange = (field: keyof UserProfile) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handle profile update
  const handleSave = async () => {
    try {
      setIsLoading(true);

      // Handle profile update
      const profileRes = await api.put("/user/profile", {
        firstName: form.firstName,
        lastName: form.lastName,
      });

      let updatedUser = profileRes.data;

      // Update profile picture (only if changed)
      if (newProfilePic) {
        const formData = new FormData();
        formData.append("profilePicPath", newProfilePic);

        const picRes = await api.post("/user/profile-picture", formData);
        updatedUser = picRes.data;
      }

      setForm(updatedUser);

      setEditMode(false);

      notifications.show({
        color: "green",
        title: "Success",
        message: "Profile updated successfully",
      });
    } catch (err) {
      console.error("Failed to update profile:", err);
      notifications.show({
        color: "red",
        title: "Failed",
        message: "Profile update failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center>
      <Box w="100%" maw={400} mx="auto" px="sm">
        <Stack gap="sm">
          <Center>
            <Box
              w={{ base: 100, sm: 150 }}
              h={{ base: 100, sm: 150 }}
              mx="auto"
              pos="relative"
              style={{ overflow: "hidden" }}
            >
              <Image
                component={NextImage}
                src={form.profilePicPath || NullProfilePic}
                alt="Profile pic"
                fill
                unoptimized
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Center>

          {editMode && (
            <Box>
              <Text fw={700} size="sm">
                Profile Picture
              </Text>

              <Dropzone
                onDrop={(files) => {
                  if (files.length > 0) {
                    setNewProfilePic(files[0]);
                  }
                }}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={2 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                multiple={false}
              >
                <Group
                  justify="center"
                  gap="xs"
                  mih={80}
                  style={{ pointerEvents: "none" }}
                >
                  <Dropzone.Accept>
                    <IconUpload
                      size={20}
                      color="var(--mantine-color-blue-6)"
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      size={20}
                      color="var(--mantine-color-red-6)"
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto
                      size={40}
                      color="var(--mantine-color-dimmed)"
                      stroke={1.5}
                    />
                  </Dropzone.Idle>

                  <div>
                    <Text size="md" inline>
                      Drag images here or click to select file
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      File must not exceed 2MB
                    </Text>

                    {newProfilePic && (
                      <Text size="sm" mt={5} c="blue" fw={700}>
                        Selected: {newProfilePic.name}
                      </Text>
                    )}
                  </div>
                </Group>
              </Dropzone>
            </Box>
          )}

          {editMode ? (
            <TextInput
              label="First Name"
              required
              value={form.firstName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange("firstName")(e.currentTarget.value)
              }
            />
          ) : (
            <Box>
              <Text fw={700}>First Name</Text>
              <Text>{form.firstName || "-"}</Text>
            </Box>
          )}

          {editMode ? (
            <TextInput
              label="Last Name"
              required
              value={form.lastName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange("lastName")(e.currentTarget.value)
              }
            />
          ) : (
            <Box>
              <Text fw={700}>Last Name</Text>
              <Text>{form.lastName || "-"}</Text>
            </Box>
          )}

          {editMode ? (
            <TextInput label="Email" required disabled value={form.email} />
          ) : (
            <Box>
              <Text fw={700}>Email</Text>
              <Text>{form.email || "-"}</Text>
            </Box>
          )}

          <Group mt="md">
            {editMode ? (
              <>
                <Button
                  color="gray"
                  variant="outline"
                  loading={isLoading}
                  onClick={() => {
                    if (originalForm) setForm(originalForm);
                    setNewProfilePic(null);
                    setEditMode(false);
                  }}
                >
                  Cancel
                </Button>
                <Button loading={isLoading} onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <Button
                loading={isLoading}
                onClick={() => {
                  setOriginalForm(form);
                  setEditMode(true);
                }}
              >
                Edit
              </Button>
            )}
          </Group>
        </Stack>
      </Box>
    </Center>
  );
}
