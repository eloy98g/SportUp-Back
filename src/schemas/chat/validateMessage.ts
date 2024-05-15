import { z } from "zod"

const schema = z.object({
  text: z.string(),
  user: z.object({ _id: z.string() }),
  createdAt: z.string(),
  _id: z.string()
})

export function validateMessage(input: any) {
  return schema.safeParse(input);
}
