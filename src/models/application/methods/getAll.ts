import { connection } from "../../dbConnection";
import mapApplication from "../../../types/application/methods/mapApplication";

export async function getAll(input: any) {
  const sql = `
    SELECT a.gid, u.name, u.image, u.gid AS userGid, a.status
    FROM application a
    LEFT JOIN user u ON a.userGid = u.gid
    WHERE activityGid = ?
    AND a.status = 'pending'
    ORDER BY a.creationDate DESC;`;
  const args = [input];

  const { rows } = await connection.execute({ sql, args });

  if (rows.length === 0) return [];

  return rows.map((row: any) => mapApplication(row));
}
