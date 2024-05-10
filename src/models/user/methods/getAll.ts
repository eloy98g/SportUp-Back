import mapUser from "../../../types/methods/mapUser";
import { connection } from "../../dbConnection";

export async function getAll(input: any) {
  let getClause = Object.keys(input)
    .map((key) => `${key} = ?`)
    .join(", ");
  let args: any = [...Object.values(input)];

  let sql = `SELECT * FROM USER u WHERE ${getClause} LEFT JOIN location_user lu ON u.gid = lu.userGid`;

  const { rows } = await connection.execute({
    sql,
    args,
  });

  if (rows) {
    const users = rows.map((row: any) => mapUser(row));
    return { result: false, message: "success", data: users };
  }

  return { result: false, message: "Error searching users", data: [] };
}
