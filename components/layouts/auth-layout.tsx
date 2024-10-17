import { Box, Flex, Stack } from "@mantine/core";
import React from "react";
import { Navbar } from "@components/navbar";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box h="100vh">
      <Flex className="h-full w-full" w="100%" h="100%">
        <Stack w="50%" p="md" h="100%" justify="space-between">
          <Navbar />
          <Stack maw="450px" miw="450px" mx="auto">
            {children}
          </Stack>
          <Box />
        </Stack>
        <Box bg="red" w="50%" />
      </Flex>
    </Box>
  );
};
