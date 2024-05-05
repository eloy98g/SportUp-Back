import { connection } from "../../dbConnection";

const getApplication = async (userGid: string, activityGid: string) => {
  const { rows: application } = await connection.execute({
    sql: "SELECT gid FROM application WHERE userGid = ? AND activityGid = ? AND status = 'pending';",
    args: [userGid, activityGid],
  });

  return application.length > 0;
};

export default getApplication;