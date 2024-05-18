import { z } from "zod";

const reportSchema = z.object({
  userGid: z.string(),
  reportedBy: z.string(),
  reportReason: z.string(),
});

export function validateReport(input: any) {
  return reportSchema.safeParse(input);
}
