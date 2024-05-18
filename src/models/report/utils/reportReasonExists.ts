import { connection } from "../../dbConnection";

const reportReasonExists = async (reportReason: string) => {
  const { rows } = await connection.execute({
    sql: "SELECT * FROM report_reason WHERE gid = ?;",
    args: [reportReason],
  });

  return rows.length > 0;
};

export default reportReasonExists;