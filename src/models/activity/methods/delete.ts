import { connection } from "../../dbConnection";

export async function deleteActivity(gid: string) {
  const result = await connection.execute({
    sql: "DELETE FROM activity WHERE gid = ?;",
    args: [gid],
  });

  if (result.rowsAffected > 0) {
    return true;
  }
  return null;
}
