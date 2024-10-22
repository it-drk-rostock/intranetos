"use server";

import { readMe } from "@directus/sdk";
import { client } from "@lib/directus/clients";

export type DirectusUserProps = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar: string | null;
  description: string | null;
  title: string | null;
  location: string | null;
  requested_policies: string[];
};

export const getDirectusUser = async (
  token: string
): Promise<DirectusUserProps> => {
  return (await client(token).request(
    readMe({
      fields: [
        "id",
        "email",
        "first_name",
        "last_name",
        "avatar",
        "description",
        "title",
        "location",
        "requested_policies",
      ],
    })
  )) as DirectusUserProps;
};
