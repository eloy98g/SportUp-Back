import { createClient } from "@libsql/client";
import "dotenv/config";

const DEFAULT_CONFIG = {
  url: process.env.DATABASE_URL ?? "",
  authToken: process.env.DATABASE_TOKEN ?? "",
};

const connection = await createClient(DEFAULT_CONFIG);

export class UserModel {}