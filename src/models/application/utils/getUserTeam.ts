import { connection } from "../../dbConnection";

const getUserTeam = async (userGid: string, activityGid: string) => {
  const { rows: userTeam } = await connection.execute({
    sql: "SELECT teamGid FROM user_team WHERE userGid = ? AND activityGid = ?;",
    args: [userGid, activityGid],
  });

  return userTeam.length > 0;
};

export default getUserTeam;