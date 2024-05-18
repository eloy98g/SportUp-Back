import { connection } from "../../models/dbConnection";

const activityExists = async (activityGid: string) => {
  const { rows } = await connection.execute({
    sql: "SELECT gid FROM activity WHERE gid = ?;",
    args: [activityGid],
  });

  return rows.length > 0;
};

export default activityExists;
