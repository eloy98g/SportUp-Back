import { z } from "zod";

const userSchema = z.object({
  userGid: z.string().optional(),
  name: z.string().optional(),
  following: z.string().optional(),
  followedBy: z.number().optional(),
});

export function validateAllUser(input: any) {
  return userSchema.safeParse(input);
}
