import { connection } from "../../dbConnection";

export async function favorite(sportGid: string, userGid: string) {
  const { rows: sportExists } = await connection.execute({
    sql: `SELECT gid FROM sport WHERE gid = ?;`,
    args: [sportGid],
  });

  if (sportExists.length === 0) {
    return {
      result: false,
      message: "El deporte que intentas marcar como favorito no existe",
      data: "",
    };
  }

  const { rows } = await connection.execute({
    sql: `SELECT * FROM sport_favorite WHERE userGid = ? AND sportGid = ?;`,
    args: [userGid, sportGid],
  });

  if (rows.length > 0) {
    return {
      result: false,
      message: "Ya sigues a este deporte",
      data: "",
    };
  }

  const { rowsAffected } = await connection.execute({
    sql: `INSERT INTO sport_favorite (userGid, sportGid) VALUES (?, ?);`,
    args: [userGid, sportGid],
  });

  if (rowsAffected === 1) {
    return {
      result: true,
      data: "Deporte seguido correctamente",
      message: "",
    };
  }
  return {
    result: false,
    message: "Error al seguir el deporte",
    data: "",
  };
}
