import { connection } from "../../dbConnection";

const getAccess = async (activityGid: string) => {
  const { rows } = await connection.execute({
    sql: "SELECT access FROM activity WHERE gid = ?;",
    args: [activityGid],
  });
  if (rows.length === 0) return false;
  else return rows[0].access;
};

export default getAccess;