"use server";

import { actionClient } from "@server/utils/action-clients";
import { signInSchema } from "./_schemas";
import { signIn as authSignIn, signOut as authSignOut } from "@lib/auth";
import { redirect } from "next/navigation";

export const signIn = actionClient
  .schema(signInSchema)
  .action(async ({ parsedInput: { email, password, provider } }) => {
    try {
      await authSignIn("credentials", {
        email,
        password,
        provider,
        redirect: false,
      });
    } catch (error) {
      throw new Error(error.message);
    }
    redirect("/");
  });

export const signOut = actionClient.action(async () => {
  try {
    await authSignOut({ redirect: false });
  } catch (error) {
    throw new Error(error.message);
  }
  redirect("/sign-in");
});
