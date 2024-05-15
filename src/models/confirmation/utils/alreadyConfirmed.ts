import { connection } from "../../dbConnection";

const alreadyConfirmed = async (userGid: string, activityGid: string) => {
  const { rows: confirmations } = await connection.execute({
    sql: "SELECT * FROM confirmation WHERE userGid = ? AND activityGid = ?;",
    args: [userGid, activityGid],
  });

  return confirmations.length > 0;
};

export default alreadyConfirmed;