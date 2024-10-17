import { signInSchema } from "@/app/(auth)/sign-in/_schemas";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { adminClient, authClient, client } from "./directus/clients";
import { v4 as uuidv4 } from "uuid";
import { readMe, updateUser } from "@directus/sdk";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        provider: { type: "text", label: "Provider" },
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      authorize: async (credentials) => {
        try {
          const { provider, email, password } = await signInSchema.parseAsync({
            provider: credentials.provider,
            email: credentials.email,
            password: credentials.password,
          });

          const signIn =
            provider === "local"
              ? await authClient.login(email, password)
              : await authClient.login(email, password, { provider });

          if (!signIn) {
            throw new Error(
              "Der Benutzername oder das Passwort ist falsch. Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut."
            );
          }

          const user = await client(signIn.access_token as string).request(
            readMe({
              fields: [
                "id",
                "email",
                "first_name",
                "last_name",
                "avatar",
                "description",
                "policies",
                "title",
                "location",
              ],
            })
          );

          const token = uuidv4();
          await adminClient.request(
            updateUser(user.id, {
              token: token,
            })
          );

          return { ...user, token };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
});
