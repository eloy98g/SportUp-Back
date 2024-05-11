import { connection } from "../../dbConnection";

export async function unfavorite(sportGid: string, userGid: string) {
  const { rows } = await connection.execute({
    sql: `SELECT * FROM sport_favorite WHERE userGid = ? AND sportGid = ?;`,
    args: [userGid, sportGid],
  });

  if (rows.length === 0) {
    return {
      result: false,
      message: "No sigues a este deporte",
      data: "",
    };
  } else {
    const { rowsAffected } = await connection.execute({
      sql: `DELETE FROM sport_favorite WHERE userGid = ? AND sportGid = ?;`,
      args: [userGid, sportGid],
    });

    if (rowsAffected === 1) {
      return {
        result: true,
        data: "Has desmarcado correctamente el deporte",
        message: "",
      };
    }
    return {
      result: false,
      message: "Error al desmarcar el deporte",
      data: "",
    };
  }
}
