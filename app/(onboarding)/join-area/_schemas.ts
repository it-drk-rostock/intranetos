import { z } from "zod";
import { requiredFieldMessage } from "@constants/required-field-message";

export const joinAreaSchema = z.object({
  policies: z
    .array(
      z.object({
        name: z.string(),
      })
    )
    .min(1, { message: requiredFieldMessage }),
});
