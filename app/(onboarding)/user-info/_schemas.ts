import { z } from "zod";
import { requiredFieldMessage } from "@constants/required-field-message";

export const userInfoSchema = z.object({
  firstName: z.string().min(1, { message: requiredFieldMessage }),
  lastName: z.string().min(1, { message: requiredFieldMessage }),
});
