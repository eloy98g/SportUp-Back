import { z } from "zod";

const activitySchema = z.object({
  activityGid: z.string(),
  userGid: z.string(),
});

const codeSchema = z.object({
  code: z.string(),
  userGid: z.string(),
});

const applicationSchema = z.union([activitySchema, codeSchema]);

export function validateApplication(input: any) {
  return applicationSchema.safeParse(input);
}

const responseEnum = z.enum(["accepted", "rejected"]);

const applicationResponse = z.object({
  response: responseEnum,
});

export function validateApplicationResponse(input: any) {
  return applicationResponse.safeParse(input);
}
