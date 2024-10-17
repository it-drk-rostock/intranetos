"use server";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { auth } from "@lib/auth";
import { getDirectusUser } from "@server/utils/get-directus-user";

export const getCurrentUser = cache(async () => {
  const session = await auth();

  if (!session) {
    throw new Error("Sie sind nicht angemeldet");
  }

  const { token } = session;

  return await unstable_cache(
    async (token) => {
      return await getDirectusUser(token);
    },
    [token],
    {
      tags: ["user", token],
      revalidate: 30,
    }
  )(token);
});

export type CurrentUserProps = Awaited<ReturnType<typeof getCurrentUser>>;
