import { connection } from "../../dbConnection";

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
        // TODO: this should be a trigger
        const { activityGid, userGid } = select[0];
        const { rowsAffected } = await connection.execute({
          sql: `INSERT INTO user_team (userGid, activityGid, teamGid)
        SELECT ?, ?, t.gid
        FROM team t
        WHERE t.activityGid = ? 
        AND t.gid NOT IN (
            SELECT ut.teamGid
            FROM user_team ut
            WHERE ut.activityGid = ?
            GROUP BY ut.teamGid
            HAVING COUNT(ut.userGid) >= (
                SELECT a.playersPerTeam
                FROM activity a
                WHERE a.gid = ?
            )
        )
        ORDER BY (
            SELECT COUNT(ut.userGid)
            FROM user_team ut
            WHERE ut.activityGid = ?
            AND ut.teamGid = t.gid
        ) ASC
        LIMIT 1;`,
          args: [
            userGid,
            activityGid,
            activityGid,
            activityGid,
            activityGid,
            activityGid,
          ],
        });

        if (rowsAffected === 0) {
          const { rowsAffected: updated } = await connection.execute({
            sql: `UPDATE application SET status = 'pending' WHERE gid = ?;`,
            args: [gid],
          });
          if (updated === 0) {
            return {
              result: false,
              message:
                "No hay espacio para el usuario. Error actualizando la solicitud",
            };
          } else {
            return {
              result: false,
              message: "No hay espacios disponibles ahora mismo",
            };
          }
        } else {
          return { result: true };
        }
      }
    }
  }
}
