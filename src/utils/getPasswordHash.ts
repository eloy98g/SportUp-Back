import { createHash } from "crypto";

const getPasswordHash = (password: string): string => {
  const passwordHash = createHash("md5").update(password).digest("hex");
  return passwordHash;
};

export default getPasswordHash;
