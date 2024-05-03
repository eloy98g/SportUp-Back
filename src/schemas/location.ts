import { z } from "zod";

const locationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  address: z.string().optional(),
  radius: z.number().optional(),
});

export default locationSchema;