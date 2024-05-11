import { connection } from "../../dbConnection";

export async function follow(userGid: string, friendGid: string) {
  const { rows: userExists } = await connection.execute({
    sql: `SELECT gid FROM user WHERE gid = ?;`,
    args: [friendGid],
  });

  if (userExists.length === 0) {
    return {
      result: false,
      message: "El usuario que intentas seguir no existe",
      data: "",
    };
  }

  const { rows } = await connection.execute({
    sql: `SELECT * FROM friends WHERE user = ? AND following = ?;`,
    args: [userGid, friendGid],
  });

  if (rows.length > 0) {
    return {
      result: false,
      message: "Ya sigues a este usuario",
      data: "",
    };
  }

  const { rowsAffected } = await connection.execute({
    sql: `INSERT INTO friends (user, following) VALUES (?, ?);`,
    args: [userGid, friendGid],
  });

  if (rowsAffected === 1) {
    return {
      result: true,
      data: "Usuario seguido correctamente",
      message: "",
    };
  }
  return {
    result: false,
    message: "Error al seguir al usuario",
    data: "",
  };
}
