import { connection } from "../../dbConnection";

const getActivityByCode = async (code: string): Promise<string | false> => {
  const { rows } = await connection.execute({
    sql: "SELECT gid FROM activity WHERE code = ?;",
    args: [code],
  });
  if (rows.length === 0) return false;
  else return rows[0].gid as string;
};

export default getActivityByCode;
