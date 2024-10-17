"use client";
import { Button, ButtonProps } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

export type ButtonLinkProps = ButtonProps & {
  children: React.ReactNode;
  href: string;
};

export const ButtonLink = ({ children, href, ...props }: ButtonLinkProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      {...props}
      loading={isPending}
      onClick={() => startTransition(() => router.push(href))}
    >
      {children}
    </Button>
  );
};
