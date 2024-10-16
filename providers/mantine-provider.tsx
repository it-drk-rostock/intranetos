"use client";
import React from "react";
import "dayjs/locale/de";
import {
  createTheme,
  MantineProvider as MantineProviderCore,
} from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

export const theme = createTheme({
  primaryColor: "blue",
});

export const MantineProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <MantineProviderCore theme={theme}>
      <Notifications />
      <DatesProvider
        settings={{
          locale: "de",
          timezone: "UTC",
        }}
      >
        <ModalsProvider>{children}</ModalsProvider>
      </DatesProvider>
    </MantineProviderCore>
  );
};
