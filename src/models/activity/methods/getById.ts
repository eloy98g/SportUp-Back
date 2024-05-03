import mapActivity from "../../../types/activity/methods/mapActivity";
import { connection } from "../../dbConnection";
import { baseActivityQuery } from "../baseActivityQuery";

export async function getById(gid: string) {
  const { rows } = await connection.execute({
    sql: `${baseActivityQuery} WHERE a.gid = ?;`,
    args: [gid],
  });

  if (rows.length === 0) return null;

  const activity = mapActivity(rows[0]);
  return activity;
}
