import { z } from "zod";

const authSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
      required_error: "Email is required.",
    })
    .email({
      message: "Invalid email address",
    }),
  password: z
    .string({
      invalid_type_error: "Invalid password",
      required_error: "Email is required.",
    })
    .min(8),
});

export function validateCredentials(input: any) {
  return authSchema.safeParse(input);
}
