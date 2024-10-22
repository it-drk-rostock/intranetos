"use client";
import React from "react";
import { Button, TextInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";

import { useEnhancedAction } from "@hooks/use-enhanced-action";
import { CardContainer } from "@/components/card-container";
import { userInfoSchema } from "../_schemas";
import { updateUserInfo } from "../_actions";

export const UserInfoForm = () => {
  const form = useForm({
    validate: zodResolver(userInfoSchema),
    mode: "uncontrolled",
    initialValues: {
      firstName: "",
      lastName: "",
    },
  });
  const { execute, isPending } = useEnhancedAction({
    action: updateUserInfo,
  });
  return (
    <CardContainer
      title="Persönliche Informationen"
      description="Bitte geben Sie Ihre persönlichen Informationen ein."
    >
      <form
        onSubmit={form.onSubmit((values) => {
          execute({ firstName: values.firstName, lastName: values.lastName });
        })}
      >
        <Stack gap="sm">
          <TextInput
            label="Vorname"
            key={form.key("firstName")}
            {...form.getInputProps("firstName")}
          />
          <TextInput
            label="Nachname"
            key={form.key("lastName")}
            {...form.getInputProps("lastName")}
          />
          <Button loading={isPending} fullWidth type="submit">
            Speichern
          </Button>
        </Stack>
      </form>
    </CardContainer>
  );
};
