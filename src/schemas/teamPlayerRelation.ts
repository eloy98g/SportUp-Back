import * as z from "zod";

const TeamSchema = z.object({
  teamGid: z.string(),
  players: z.array(z.string()),
});

const TeamArraySchema = z.object({
  teams: z.array(TeamSchema),
});

export function validateTeamRelation(input: any) {
  return TeamArraySchema.safeParse(input);
}
