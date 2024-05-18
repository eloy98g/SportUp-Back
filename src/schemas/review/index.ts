import { z } from "zod";

const reviewSchema = z.object({
  activityGid: z.string(),
  rating: z.number().min(0).max(5),
  comment: z.string().optional(),
  reviewedBy: z.string(),
  users: z.array(z.string()).nonempty().max(50),
});

export function validateReview(input: any) {
  return reviewSchema.safeParse(input);
}
