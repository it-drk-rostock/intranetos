"use client";
import React from "react";
import {
  Button,
  PasswordInput,
  TextInput,
  Stack,
  Select,
  Paper,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { signInProviders } from "../_constants";
import { signInSchema } from "../_schemas";

export const SignInForm = () => {
  const form = useForm({
    validate: zodResolver(signInSchema),
    mode: "uncontrolled",
    initialValues: {
      provider: "ldap",
      email: "",
      password: "",
    },
  });
  return (
    <Paper withBorder p="lg">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack gap="sm">
          <Title size="h2">Anmelden</Title>
          <Text c="dimmed">
            Um Zugang zu bestimmten Bereichen zu erhalten, müssen Sie sich
            anmelden.
          </Text>
          <Select
            data={signInProviders}
            key={form.key("provider")}
            {...form.getInputProps("provider")}
          />
          <TextInput
            label="E-Mail"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          <Button fullWidth type="submit">
            Anmelden
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
