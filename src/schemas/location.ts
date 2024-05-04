import { z } from "zod";

const locationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  latitudeDelta: z.number().optional(),
  longitudeDelta: z.number().optional(),
  address: z.string().optional(),
  radius: z.number().optional(),
});

export default locationSchema;