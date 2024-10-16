import {
  createDirectus,
  staticToken,
  rest,
  authentication,
} from "@directus/sdk";

export const adminClient = createDirectus(
  process.env.NEXT_PUBLIC_DIRECTUS_URL as string
)
  .with(staticToken(process.env.DIRECTUS_ADMIN_TOKEN as string))
  .with(rest());

export const authClient = createDirectus(
  process.env.NEXT_PUBLIC_DIRECTUS_URL as string
).with(authentication());

export const client = createDirectus(
  process.env.NEXT_PUBLIC_DIRECTUS_URL as string
).with(rest());
