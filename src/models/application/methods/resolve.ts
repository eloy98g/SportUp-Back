import { connection } from "../../dbConnection";

export async function resolve(input: any) {
  const { response, gid } = input;

  const { rowsAffected } = await connection.execute({
    sql: `UPDATE application SET status = ? WHERE gid = ?;`,
    args: [response, gid],
  });

  if (rowsAffected === 0) {
    return { result: false, message: "Error updating application" };
  } else {
    if (response === "rejected") {
      return { result: true };
    } else {
      const { rows: select } = await connection.execute({
        sql: `SELECT * FROM application WHERE gid = ? AND status = 'pending';`,
        args: [gid],
      });
      if (select.length === 0) {
        return { result: false, message: "Error retrieving application data" };
      } else {
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
          return { result: false, message: "Error inserting user on team" };
        } else {
          return { result: true };
        }
      }
    }
  }
}
