import getUserTeam from "../../application/utils/getUserTeam";
import { connection } from "../../dbConnection";
import alreadyConfirmed from "../utils/alreadyConfirmed";

export async function create(input: any) {
  const { activityGid, userGid } = input;

  const confirmed = await alreadyConfirmed(userGid, activityGid);
  const userJoined = await getUserTeam(userGid, activityGid);
  if (confirmed) {
    return { result: false, message: "No se ha encontrado la actividad", data: "" };
  }

  if (!userJoined) {
    return { result: false, message: "El usuario no pertenece a la actividad", data: "" };
  }


  const sql = `INSERT INTO confirmation (userGid, activityGid) VALUES (?, ?);`;
  const args = [userGid, activityGid];
  const { rowsAffected } = await connection.execute({ sql, args });

  if (rowsAffected === 0) {
    return { result: false, message: "Error confirmando participacion",  data: "" };
  }
  return { result: true, message: "Confirmacion creada",  data: "" };
}
