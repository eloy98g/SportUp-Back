import { connection } from "../../dbConnection";

export async function unfollow(userGid: string, friendGid: string) {
  const { rows } = await connection.execute({
    sql: `SELECT * FROM friends WHERE user = ? AND following = ?;`,
    args: [userGid, friendGid],
  });

  if (rows.length === 0) {
    return {
      result: false,
      message: "No sigues a este usuario",
      data: "",
    };
  } else {
    const { rowsAffected } = await connection.execute({
      sql: `DELETE FROM friends WHERE user = ? AND following = ?;`,
      args: [userGid, friendGid],
    });

    if (rowsAffected === 1) {
      return {
        result: true,
        data: "Has dejado de seguir correctamente",
        message: "",
      };
    }
    return {
      result: false,
      message: "Error al dejar de seguir al usuario",
      data: "",
    };
  }
}
