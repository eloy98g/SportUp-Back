import { createClient } from "@libsql/client";
import "dotenv/config";

const DEFAULT_CONFIG = {
  url: process.env.DATABASE_URL ?? "",
  authToken: process.env.DATABASE_TOKEN ?? "",
};

export const connection = createClient(DEFAULT_CONFIG);