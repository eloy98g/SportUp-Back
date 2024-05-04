import { z } from "zod";

const responseEnum = z.enum(["accepted", "rejected", "pending"]);

const applicationSchema = z.object({
  status: responseEnum.optional(),
  userGid: z.string().optional(),
});

export function validateApplicationBody(input: any) {
  return applicationSchema.safeParse(input);
}
