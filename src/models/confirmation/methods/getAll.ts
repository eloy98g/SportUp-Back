import { connection } from "../../dbConnection";

export async function getAll(input: any) {
  const { activityGid = null, userGid = null } = input;

  const statusQuery = activityGid ? `activityGid = ?` : "";
  const userQuery = userGid ? `userGid = ?` : "";
  const andClause = statusQuery && userQuery ? " AND " : "";

  const args = [activityGid, userGid].filter(
    (value) => value !== null && value !== undefined
  );

  const sql = `
    SELECT userGid
    FROM confirmation WHERE
    ${statusQuery}
    ${andClause}
    ${userQuery};`;

  const { rows } = await connection.execute({ sql, args });

  if (rows) {
    return { result: true, message: "", data: rows };
  }
  return {
    result: false,
    message: "Error obteniendo las confirmaciones",
    data: rows,
  };
}
