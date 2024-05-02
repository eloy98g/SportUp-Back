import { z } from "zod";

const applicationGidSchema = z.string();

export function validateGid(input: any) {
  return applicationGidSchema.safeParse(input);
}

const applicationSchema = z.object({
  activityGid: z.string(),
  userGid: z.string(),
});

export function validateApplication(input: any) {
  return applicationSchema.safeParse(input);
}

const responseEnum = z.enum(["accepted", "rejected"]);

const applicationResponse = z.object({
  response: responseEnum
});

export function validateApplicationResponse(input: any) {
  return applicationResponse.safeParse(input);
}
