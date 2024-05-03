import { ActivityModel } from "../../activity/activityModel";
import { connection } from "../../dbConnection";

export async function update(gid: string, input: any) {
  let setClause = Object.keys(input)
    .map((key) => `${key} = ?`)
    .join(", ");

  let sql = `UPDATE activity SET ${setClause} WHERE gid = ?`;

  let args: any = [...Object.values(input), gid];
  const { rowsAffected } = await connection.execute({
    sql,
    args,
  });

  if (rowsAffected > 0) {
    return ActivityModel.getById(gid);
  }

  return false;
}
