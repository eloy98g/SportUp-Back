import { z } from "zod";
import locationSchema from "../location";

const genderEnum = z.enum(["NS/NC", "male", "female", "other"]);
const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.number().min(100000000).max(999999999).optional(),
  birthdate: z.number().optional(),
  description: z.string().optional(),
  location: locationSchema.optional(),
  gender: genderEnum.optional(),
});

export function validateUser(input: any) {
  return userSchema.safeParse(input);
}
