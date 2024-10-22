"use client";
import React from "react";
import { Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEnhancedAction } from "@hooks/use-enhanced-action";
import { CardContainer } from "@components/card-container";
import { joinAreaSchema } from "../_schemas";
import { getPolicies, requestPolicies } from "../_actions";
import { EntityMultiSelect } from "@components/entity-multi-select";

export const JoinAreaForm = () => {
  const form = useForm({
    name: "join-area-form",
    validate: zodResolver(joinAreaSchema),
    mode: "uncontrolled",
    initialValues: {
      policies: [],
    },
  });
  const { execute, isPending } = useEnhancedAction({
    action: requestPolicies,
  });
  return (
    <CardContainer
      title="Bereiche beitreten"
      description="Bitte wählen Sie die Bereiche aus, denen sie angehören, um die nötigen Berechtigungen zu erhalten."
    >
      <form
        onSubmit={form.onSubmit((values) => {
          execute(values);
        })}
      >
        <Stack gap="sm">
          <EntityMultiSelect
            formActionName="join-area-form"
            formField="policies"
            label="Bereiche"
            action={getPolicies}
            displayKey="name"
            dataKey="policies"
          />

          <Button loading={isPending} fullWidth type="submit">
            Speichern
          </Button>
        </Stack>
      </form>
    </CardContainer>
  );
};
