import { z } from "zod";

const userSchema = z.object({
  name: z.string().optional(),
  following: z.string().optional(),
  followedBy: z.string().optional(),
});

export function validateAllUser(input: any) {
  return userSchema.safeParse(input);
}
