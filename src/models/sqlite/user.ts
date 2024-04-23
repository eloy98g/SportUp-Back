import { connection } from "./dbConnection.ts";

export class UserModel {
  static async getById({ id }: { id: string }) {
    const { rows } = await connection.execute({
      sql: `SELECT * FROM user WHERE gid = ?;`,
      args: [id],
    });

    if (rows.length === 0) return null;

    return rows[0];
  }
}