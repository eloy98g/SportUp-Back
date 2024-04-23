import { User } from "../../types";
import mapUser from "../../types/methods/mapUser";
import { connection } from "./dbConnection";

export class UserModel {
  static async getById({ id }: { id: string }): Promise<User | null> {
    const { rows } = await connection.execute({
      sql: `SELECT * FROM user WHERE gid = ?;`,
      args: [id],
    });

    if (rows.length === 0) return null;

    const user = mapUser(rows[0]);

    return user;
  }
}
