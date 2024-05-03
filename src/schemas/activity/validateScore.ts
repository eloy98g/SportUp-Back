import { z } from "zod";

const scoreSchema = z.object({
  team: z.string(),
  points: z.number(),
  position: z.number(),
});

const scoreArraySchema = z.object({
  scores: z.array(scoreSchema),
});

export function validateScoreArray(input: any) {
  return scoreArraySchema.safeParse(input);
}
