"use server";
import { updateUser } from "@directus/sdk";
import { authActionClient } from "@server/utils/action-clients";
import { userInfoSchema } from "./_schemas";
import { client } from "@lib/directus/clients";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const updateUserInfo = authActionClient
  .schema(userInfoSchema)
  .metadata({
    event: "updateUserInfo",
  })
  .action(
    async ({ parsedInput: { firstName, lastName }, ctx: { user, token } }) => {
      try {
        await client(token).request(
          updateUser(user.id, {
            first_name: firstName,
            last_name: lastName,
          })
        );
      } catch (error) {
        throw new Error(error.message);
      }

      revalidateTag("user");
      redirect("/join-area");
    }
  );
