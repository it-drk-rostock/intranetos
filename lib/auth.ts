import NextAuth from "next-auth";
import { updateUser } from "@directus/sdk";
import { v4 as uuidv4 } from "uuid";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/app/(auth)/sign-in/_schemas";
import { adminClient, authClient } from "./directus/clients";
import { getDirectusUser } from "@server/utils/get-directus-user";

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

          const user = await getDirectusUser(signIn.access_token as string);

          const token = uuidv4();
          await adminClient.request(
            updateUser(user.id, {
              token: token,
            })
          );

          return {
            ...user,
            token,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  events: {
    async signOut(message) {
      await adminClient.request(
        updateUser(message.token.id, {
          token: null,
        })
      );
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.first_name;
        token.lastName = user.last_name;
        token.avatar = user.avatar;
        token.title = user.title;
        token.location = user.location;
        token.token = user.token;

        return token;
      }

      const refreshedUser = await getDirectusUser(token.token as string);

      token.id = refreshedUser.id;
      token.email = refreshedUser.email;
      token.firstName = refreshedUser.first_name;
      token.lastName = refreshedUser.last_name;
      token.avatar = refreshedUser.avatar;
      token.title = refreshedUser.title;
      token.location = refreshedUser.location;
      token.token = token.token;

      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        firstName: token.firstName,
        lastName: token.lastName,
        avatar: token.avatar,
        title: token.title,
        location: token.location,
      };
      session.token = token.token;

      return session;
    },
  },
});
