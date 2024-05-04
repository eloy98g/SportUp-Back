import { connection } from "../../dbConnection";
import mapApplication from "../../../types/application/methods/mapApplication";

export async function getAll(gid: string, input: any) {
  const { status = null, userGid = null } = input;

  const statusQuery = status ? `AND a.status = ?` : "";
  const userQuery = userGid ? `AND a.userGid = ?` : "";

  const args = [gid, status, userGid].filter(
    (value) => value !== null && value !== undefined
  );

  const sql = `
    SELECT a.gid, u.name, u.image, u.gid AS userGid, a.status
    FROM application a
    LEFT JOIN user u ON a.userGid = u.gid
    WHERE activityGid = ?
    ${statusQuery}
    ${userQuery}
    ORDER BY a.creationDate DESC;`;

  const { rows } = await connection.execute({ sql, args });

  if (rows.length === 0) return [];

  return rows.map((row: any) => mapApplication(row));
}
