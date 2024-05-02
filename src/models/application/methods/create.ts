import { connection } from "../../dbConnection";

export async function create(input: any) {
  const { activityGid, userGid } = input;

  const { rows } = await connection.execute({
    sql: "SELECT gid FROM application WHERE userGid = ? AND activityGid = ?;",
    args: [userGid, activityGid],
  });

  if (rows.length > 0)
    return { result: false, message: "User already applied to this activity" };

  const date = Date.now();
  const sql = `INSERT INTO application (creationDate, activityGid, userGid, status) VALUES (?, ?, ?, 'pending');`;
  const args = [date, activityGid, userGid];

  const { rowsAffected } = await connection.execute({ sql, args });

  if (rowsAffected === 0)
    return { result: false, message: "Error creating application" };
  return { result: true };
}
