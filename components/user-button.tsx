"use client";
import { useEnhancedAction } from "@/hooks/use-enhanced-action";
import { signOut } from "@/app/(auth)/sign-in/_actions";
import { ActionIcon, Avatar, Loader, Menu } from "@mantine/core";
import { useSession } from "next-auth/react";
import React from "react";
import { Logout } from "tabler-icons-react";

export const UserButton = () => {
  const session = useSession();

  const { execute } = useEnhancedAction({
    action: signOut,
    onSuccess: () => {
      window.location.reload();
    },
  });

  if (session.status === "loading") {
    return <Loader />;
  }
  if (!session.data) {
    return null;
  }
  return (
    <Menu shadow="md" width={200} withinPortal>
      <Menu.Target>
        <ActionIcon color="gray" size="xl" variant="subtle" radius="xl">
          <Avatar radius="xl" color="black" />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{session.data?.user?.email}</Menu.Label>
        <Menu.Item
          icon={<Logout size={16} />}
          onClick={() => {
            execute({});
          }}
        >
          Abmelden
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
