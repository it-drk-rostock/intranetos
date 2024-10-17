"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Divider, Flex, Stack, Text } from "@mantine/core";

export const Branding = () => {
  return (
    <Link href="/">
      <Flex align="center" gap="xs">
        <Image src="/branding.svg" alt="Logo" width={151} height={47.8} />
        <Divider orientation="vertical" />
        <Stack gap="0">
          <Text mb="-8" size="xl" fw={500}>
            Intranet
          </Text>
          <Text size="xl" fw={500}>
            DRK Rostock
          </Text>
        </Stack>
      </Flex>
    </Link>
  );
};
