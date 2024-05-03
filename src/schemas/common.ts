import { z } from "zod";

const gid = z.string().uuid();

export function validateGid(input: any) {
  return gid.safeParse(input);
}