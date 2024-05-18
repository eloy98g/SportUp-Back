import { connection } from "../../models/dbConnection";

const userExistsByGid = async (userGid: string) => {
  const { rows } = await connection.execute({
    sql: "SELECT * FROM USER WHERE gid = ?;",
    args: [userGid],
  });

  return rows.length > 0;
};

export default userExistsByGid;
