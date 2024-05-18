import { connection } from "../../dbConnection";

export async function getReportReasons() {
  const sql = `SELECT * FROM report_reason;`;

  const { rows } = await connection.execute(sql);

  if (!rows)
    return {
      result: false,
      message: "Error al intentar obtener los tipos de reporte.",
      data: [],
    };

  return { result: true, message: "", data: rows };
}
