import { createHash } from "crypto";

const getPasswordHash = (password: string): string => {
  if (password) {
    const passwordHash = createHash("md5").update(password).digest("hex");
    return passwordHash;
  }
  return "";
};

export default getPasswordHash;
