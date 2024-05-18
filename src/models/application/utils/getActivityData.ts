import { connection } from "../../dbConnection";

const getActivityData = async (activityGid: string) => {
  const { rows } = await connection.execute({
    sql: "SELECT access, status FROM activity WHERE gid = ?;",
    args: [activityGid],
  });
  if (rows.length === 0) return { access: null, status: null };
  else return { access: rows[0].access, status: rows[0].status };
};

export default getActivityData;
