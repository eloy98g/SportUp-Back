import { connection } from "../../dbConnection";
import getAccess from "../utils/getAccess";
import getApplication from "../utils/getApplication";
import getUserTeam from "../utils/getUserTeam";
import joinUser from "../utils/joinUser";
import { v4 as uuidv4 } from "uuid";

export async function create(input: any) {
  const { activityGid, userGid } = input;

  const access = await getAccess(activityGid);
  const userTeam = await getUserTeam(userGid, activityGid);
  const alreadyApplied = await getApplication(userGid, activityGid);

  if (!access) {
    return { result: false, message: "No se ha encontrado la actividad", data: "" };
  }

  if (userTeam) {
    return {
      result: false,
      message: "Este usuario ya pertenece a la actividad",
      data: ""
    };
  }

  if (alreadyApplied) {
    return { result: false, message: "Este usuario ya ha solicitado unirse",  data: "" };
  }

  const date = Date.now();
  const gid = uuidv4();
  const applicationStatus = access === "open" ? "accepted" : "pending";

  const sql = `INSERT INTO application (gid, creationDate, activityGid, userGid, status) VALUES (?, ?, ?, ?, ?);`;
  const args = [gid, date, activityGid, userGid, applicationStatus];
  const { rowsAffected } = await connection.execute({ sql, args });

  if (rowsAffected === 0) {
    return { result: false, message: "Error creando la solicitud",  data: "" };
  }

  if (access === "open") {
    const joinResult = await joinUser(activityGid, userGid, gid);

    if (joinResult.result) {
      return {
        ...joinResult,
        data: "automatic",
        message: "Te has unido correctamente",
      };
    } else {
      return {...joinResult, data: ""};
    }
  } else {
    return {
      result: true,
      data: "administrated",
      message:
        "Solicitud creada correctamente. El administrador responderá lo antes posible.",
    };
  }
}
