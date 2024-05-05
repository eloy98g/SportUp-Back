import { connection } from "../../dbConnection";
import joinUser from "../utils/joinUser";

export async function resolve(input: any) {
  const { response, gid } = input;

  const { rowsAffected } = await connection.execute({
    sql: `UPDATE application SET status = ? WHERE gid = ?;`,
    args: [response, gid],
  });

  if (rowsAffected === 0) {
    return { result: false, message: "Error actualizando la solicitud" };
  } else {
    if (response === "rejected") {
      return { result: true };
    } else {
      const { rows: select } = await connection.execute({
        sql: `SELECT * FROM application WHERE gid = ? AND status = 'accepted';`,
        args: [gid],
      });
      if (select.length === 0) {
        return {
          result: false,
          message: "Error obteniendo datos de la solicitud",
        };
      } else {
        const { activityGid, userGid } = select[0];
        const resultJoin = await joinUser(activityGid, userGid, gid);
        return { ...resultJoin };
      }
    }
  }
}
