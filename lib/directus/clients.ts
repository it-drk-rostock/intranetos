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
  .with(
    rest({
      onRequest: (options) => ({ ...options, cache: "no-store" }),
    })
  );

export const authClient = createDirectus(
  process.env.NEXT_PUBLIC_DIRECTUS_URL as string
).with(authentication());

export const client = (token: string) => {
  return createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL as string)
    .with(staticToken(token))
    .with(
      rest({
        onRequest: (options) => ({ ...options, cache: "no-store" }),
      })
    );
};
