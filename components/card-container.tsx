"use client";
import { Stack, Title, Text, Paper } from "@mantine/core";
import React from "react";

export type CardContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export const CardContainer = ({
  children,
  title,
  description,
}: CardContainerProps) => {
  return (
    <Paper withBorder p="lg">
      <Stack gap="sm">
        <Title size="h2">{title}</Title>
        <Text c="dimmed">{description}</Text>
        {children}
      </Stack>
    </Paper>
  );
};
