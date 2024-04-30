import { z } from "zod";

const VisibilityEnum = z.enum(["public", "private"]);
const TypeEnum = z.enum(["normal", "competitive"]);
const StatusEnum = z.enum([
  "draft",
  "pending",
  "closed",
  "ongoing",
  "waitingScore",
  "finished",
]);
const PriceEnum = z.enum(["0€", "1€-5€", "5€-10€", "10€-15€", "15€"]);

const activitySchema = z.object({
  visibility: VisibilityEnum.optional(),
  type: TypeEnum.optional(),
  status: StatusEnum.optional(),
  sports: z.array(z.string()).nonempty().optional(),
  userGid: z.string().optional(),
  admin: z.string().optional(),
  price: PriceEnum.optional(),
});

export function validateActivityParameters(input: any) {
  return activitySchema.safeParse(input);
}

const acitivityGidSchema = z.string();
export function validateActivityGid(input: any) {
  return acitivityGidSchema.safeParse(input);
}
