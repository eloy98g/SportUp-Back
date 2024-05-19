import { connection } from "../../../models/dbConnection";

const userAlreadyReviewd = async (userGid: string, reviewedBy:string, activityGid:string) => {
  const { rows } = await connection.execute({
    sql: `SELECT *
    FROM activity_review ar
    JOIN review_user ru ON ar.gid = ru.reviewGid
    WHERE ar.reviewedBy = ? AND ar.activityGid = ? AND ru.userGid = ?;`,
    args: [reviewedBy, activityGid, userGid],
  });

  return rows.length > 0;
};

export default userAlreadyReviewd;