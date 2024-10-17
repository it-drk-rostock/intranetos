import { z } from "zod";
import { signInProviders } from "./_constants";

const requiredFieldMessage = "Dieses Feld ist erforderlich";

export const signInSchema = z.object({
  provider: z.enum(
    signInProviders.map((provider) => provider.value) as [string, ...string[]]
  ),
  email: z
    .string()
    .email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein" }),
  password: z.string().min(1, { message: requiredFieldMessage }),
});
