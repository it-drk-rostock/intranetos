"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Box, Container, Flex, Stack } from "@mantine/core";

export const OnboardingLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Container fluid mih="100vh" pos="relative" px="sm" py="sm">
      <Flex direction="column">
        <Navbar />
        <Flex justify="center" align="center" mt="xl">
          <Stack w="100%" gap="lg">
            {children}
          </Stack>
        </Flex>
        <Box
          pos="absolute"
          bottom="0"
          left="0"
          right="0"
          h="60%"
          w="100%"
          bg="red"
          style={{
            zIndex: -1,
            overflow: "hidden",
          }}
        ></Box>
      </Flex>
    </Container>
  );
};
