import mapSimpleUser from "../../../types/user/methods/mapSimpleUser";
import { connection } from "../../dbConnection";

const getByFollowedBy = async (gid: string) => {
  const sql =
    "SELECT gid, name, image FROM user WHERE gid IN (SELECT following FROM friends WHERE user = ?);";

  const args = [gid];

  const { rows } = await connection.execute({
    sql,
    args,
  });
  return rows;
};

const getByFollowing = async (gid: string) => {
  const sql =
    "SELECT gid, name, image FROM user WHERE gid IN (SELECT user FROM friends WHERE following = ?);";

  const args = [gid];

  const { rows } = await connection.execute({
    sql,
    args,
  });
  return rows;
};

const getByName = async (name: string) => {
  const sql = "SELECT gid, name, image FROM user WHERE name LIKE ? ;";

  const nameArg = `%${name}%`;
  const args = [nameArg];

  const { rows } = await connection.execute({
    sql,
    args,
  });
  return rows;
};

export async function getAll(input: any) {
  const { following = null, followedBy = null, name = null } = input;

  const result = following
    ? await getByFollowing(following)
    : followedBy
    ? await getByFollowedBy(followedBy)
    : await getByName(name);

  if (result) {
    const users = result.map((row: any) => mapSimpleUser(row));
    return { result: true, message: "success", data: users };
  }

  return { result: false, message: "Error searching users", data: [] };
}
