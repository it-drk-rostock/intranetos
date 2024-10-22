"use server";

import { client } from "@/lib/directus/clients";
import { createItem } from "@directus/sdk";

export const trackEvent = async (token: string, event: string) => {
  if (process.env.NODE_ENV === "development") return;

  await client(token).request(
    createItem("events", {
      event: event,
    })
  );
};
