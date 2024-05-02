import { z } from "zod";

const applicationSchema = z.string();

export function validateApplication(input: any) {
  return applicationSchema.safeParse(input);
}
