"use client";

import React from "react";
import { iconStyles } from "@constants/icon-styles";
import { List, Stack, ThemeIcon, Text } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { ButtonLink } from "@components/button-link";
import { CardContainer } from "@components/card-container";

export const OnboardingCompleted = () => {
  return (
    <CardContainer title="Onboarding abgeschlossen">
      <Stack gap="sm">
        <List
          spacing="xs"
          center
          icon={
            <ThemeIcon color="green" radius="xl">
              <IconCircleCheck style={iconStyles} />
            </ThemeIcon>
          }
        >
          <List.Item>Persönliche Informationen angegeben</List.Item>
          <List.Item>Berechtigungen ausgewählt & angefordert</List.Item>
        </List>
        <Text c="dimmed">
          Die IT-Abteilung wird sich schnellstmöglich um Ihre Anfrage kümmern.
        </Text>
        <ButtonLink href="/">Zur Startseite</ButtonLink>
      </Stack>
    </CardContainer>
  );
};
