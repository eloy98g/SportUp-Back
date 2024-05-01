import { z } from "zod";

const VisibilityEnum = z.enum(["public", "private"]);
const TypeEnum = z.enum(["normal", "competitive"]);
const AccessEnum = z.enum(["open", "closed"]);
const StatusEnum = z.enum([
  "draft",
  "pending",
  "closed",
  "ongoing",
  "waitingScore",
  "finished",
]);
const PriceEnum = z.enum(["0€", "1€-5€", "5€-10€", "10€-15€", "15€"]);

const getActivitySchema = z.object({
  visibility: VisibilityEnum.optional(),
  type: TypeEnum.optional(),
  status: z.array(StatusEnum).nonempty().optional(),
  sports: z.array(z.string()).nonempty().optional(),
  userGid: z.string().optional(),
  admin: z.string().optional(),
  price: PriceEnum.optional(),
});

export function validateActivityParameters(input: any) {
  return getActivitySchema.safeParse(input);
}

const acitivityGidSchema = z.string();
export function validateActivityGid(input: any) {
  return acitivityGidSchema.safeParse(input);
}

/** CREATION **/
const creationSchema = z.object({
  userGid: z.string(),
  sport: z.string(),
  name: z.string(),
  teams: z.number(),
  playersPerTeam: z.number(),
  access: AccessEnum,
  visibility: VisibilityEnum,
  type: TypeEnum,
  price: z.number(),
  lat: z.number(),
  lng: z.number(),
  address: z.string().optional(),
  dateStart: z.number(),
  duration: z.number(),
  description: z.string().optional(),
});

export function validateActivity(input: any) {
  return creationSchema.safeParse(input);
}


const editSchema = z.object({
  visibility: VisibilityEnum.optional(),
  access: AccessEnum.optional(),
  description: z.string().optional(),
  name: z.string().optional(),
})

export function validateEditActivity(input: any) {
  return editSchema.safeParse(input);
}