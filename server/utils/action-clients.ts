import * as Sentry from "@sentry/nextjs";
/* import { auth } from "@server/auth"; */
import { z } from "zod";
import { createSafeActionClient } from "next-safe-action";
/* import { getUser } from "./get-user"; */

export const actionClient = createSafeActionClient({
  async handleServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }

    return "Es ist ein Fehler aufgetreten";
  },
});

export const actionClientWithMeta = createSafeActionClient({
  async handleServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }

    return "Es ist ein Fehler aufgetreten";
  },
  defineMetadataSchema() {
    return z.object({
      permission: z.string().optional(),
      event: z.string(),
    });
  },
});

export const authActionClient = actionClientWithMeta.use(
  async ({ next, metadata }) => {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Sie müssen angemeldet sein");
    }

    await rateLimit(userId);

    const user = await getUser(userId);

    if (!user) {
      throw new Error("Benutzer nicht gefunden");
    }

    /* if (metadata && metadata.permission) {
      await checkAdminOrPermission(user, metadata.permission);
    } */

    /* if (metadata && metadata.event) {
      trackEvent(userId, metadata.event);
    } */
    return Sentry.withServerActionInstrumentation(
      metadata?.event ?? "",
      async () => {
        return next({ ctx: { user, metadata } });
      }
    );
  }
);
