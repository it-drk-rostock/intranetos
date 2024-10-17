"use client";
import React from "react";
import { Flex } from "@mantine/core";
import { ButtonLink } from "@components/button-link";
import { Branding } from "@components/branding";
import { UserButton } from "@components/user-button";

export type NavbarItem = {
  label: string;
  href: string;
};

export const Navbar = ({ items }: { items?: NavbarItem[] }) => {
  return (
    <nav>
      <Flex w="100%" h="100%" justify="space-between" align="center">
        <Flex style={{ flex: 1 }} align="center">
          <Branding />
        </Flex>
        {items && (
          <Flex gap="sm" justify="center" style={{ flex: 2 }}>
            <Flex align="center" gap="sm">
              {items.map((item) => (
                <ButtonLink key={item.label} href={item.href} variant="subtle">
                  {item.label}
                </ButtonLink>
              ))}
            </Flex>
          </Flex>
        )}
        <Flex gap="sm" align="center" justify="flex-end" style={{ flex: 1 }}>
          <UserButton />
        </Flex>
      </Flex>
    </nav>
  );
};
