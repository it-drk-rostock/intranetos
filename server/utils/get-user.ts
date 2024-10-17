"use server";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getDirectusUser } from "@server/utils/get-directus-user";

export const getUser = cache(async (token: string) => {
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

export type UserProps = Awaited<ReturnType<typeof getUser>>;
