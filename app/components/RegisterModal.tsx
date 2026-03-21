import { Modal, TextInput, PasswordInput, Stack, Button } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import { AxiosError } from "axios";
import api from "@/app/lib/axios";
import { notifications } from "@mantine/notifications";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export default function RegisterModal({ opened, onClose }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      notifications.show({
        color: "green",
        title: "Success",
        message: "Registration Successful",
      });

      handleClose();
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      console.log(error);

      notifications.show({
        color: "red",
        title: "Failed",
        message: "Registration Failed. Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Registration">
      <Stack>
        <TextInput
          required
          label="First Name"
          value={firstName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFirstName(e.currentTarget.value)
          }
        />

        <TextInput
          required
          label="Last Name"
          value={lastName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLastName(e.currentTarget.value)
          }
        />

        <TextInput
          required
          label="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.currentTarget.value)
          }
        />

        <PasswordInput
          required
          label="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value)
          }
        />

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!firstName || !lastName || !email || !password}
          loading={loading}
        >
          Register
        </Button>
      </Stack>
    </Modal>
  );
}
