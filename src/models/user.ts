import { User } from "../types";
import mapUser from "../types/methods/mapUser";
import { connection } from "./dbConnection";

export class UserModel {
  static async getById({ id }: { id: string }): Promise<User | null> {
    const { rows } = await connection.execute({
      sql: `
        SELECT u.*, lu.*
        FROM user u
        LEFT JOIN location_user lu ON u.gid = lu.gid
        WHERE u.gid = ?;
      `,
      args: [id],
    });

    if (rows.length === 0) return null;

    const user = mapUser(rows[0]);

    return user;
  }
}