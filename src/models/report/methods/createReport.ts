import userExistsByGid from "../../../utils/validations/userExistsByGid";
import { connection } from "../../dbConnection";
import reportReasonExists from "../utils/reportReasonExists";

export async function createReport(input: any) {
  const { reportReason = null, reportedBy = null, userGid = null } = input;

  const reasonExists = await reportReasonExists(reportReason);
  const userExists = await userExistsByGid(userGid);
  const reportedExists = await userExistsByGid(reportedBy);

  if (!reasonExists) {
    return {
      result: false,
      message: "El motivo del reporte no existe.",
      data: [],
    };
  }

  if (!reportedExists) {
    return {
      result: false,
      message: "El usuario al que intentas reportar no existe.",
      data: [],
    };
  }

  if (!userExists) {
    return {
      result: false,
      message:
        "Tu usuario no puede realizar esta acción. Usuario no encontrado.",
      data: [],
    };
  }

  const createdAt = Date.now();
  const sql = `INSERT INTO USER_REPORT (userGid, reportedBy, reportGid, createdAt) values (?, ?, ?, ?)`;
  const args: string[] = [userGid, reportedBy, reportReason, createdAt];

  const { rowsAffected } = await connection.execute({ sql, args });

  if (rowsAffected === 0)
    return { result: false, message: "Error al guardar el reporte.", data: [] };

  return { result: true, message: "Reporte generado con éxito", data: [] };
}
