import { connection } from "../../dbConnection";

export async function create(input: any) {
  const { activityGid, userGid } = input;

  const { rows:userTeam } = await connection.execute({
    sql: "SELECT teamGid FROM user_team WHERE userGid = ? AND activityGid = ?;",
    args: [userGid, activityGid],
  });

  const { rows:application } = await connection.execute({
    sql: "SELECT gid FROM application WHERE userGid = ? AND activityGid = ? AND status = 'pending';",
    args: [userGid, activityGid],
  });

  if (userTeam.length > 0)
    return { result: false, message: "Este usuario ya pertenece a la actividad" };

  if (application.length > 0)
    return { result: false, message: "Este usuario ya ha solicitado unirse" };

  const date = Date.now();
  const sql = `INSERT INTO application (creationDate, activityGid, userGid, status) VALUES (?, ?, ?, 'pending');`;
  const args = [date, activityGid, userGid];

  const { rowsAffected } = await connection.execute({ sql, args });

  if (rowsAffected === 0)
    return { result: false, message: "Error creando la solicitud" };
  return { result: true };
}
