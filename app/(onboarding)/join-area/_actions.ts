"use server";
import { readPolicies, updateUser } from "@directus/sdk";
import { authActionClient } from "@server/utils/action-clients";
import { joinAreaSchema } from "./_schemas";
import { adminClient, client } from "@lib/directus/clients";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const requestPolicies = authActionClient
  .schema(joinAreaSchema)
  .metadata({
    event: "requestPolicies",
  })
  .action(async ({ parsedInput: { policies }, ctx: { user, token } }) => {
    try {
      await client(token).request(
        updateUser(user.id, {
          requested_policies: policies,
        })
      );
    } catch (error) {
      throw new Error(error.message);
    }

    revalidateTag("user");
    redirect("/onboarding-completed");
  });

export const getPolicies = async (search?: string) => {
  try {
    const policies = await adminClient.request(
      readPolicies({
        fields: ["id", "name"],
        limit: 100,
        ...(search && {
          filter: {
            name: {
              _contains: search,
            },
          },
        }),
      })
    );

    return {
      policies: policies,
      message: "Policies fetched successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
