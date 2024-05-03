import { z } from "zod";

const gid = z.string()

export function validateGid(input: any) {
  return gid.safeParse(input);
}