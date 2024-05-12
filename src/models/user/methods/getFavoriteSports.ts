import { connection } from "../../dbConnection";

export async function getFavoriteSports(id: string) {
  const { rows } = await connection.execute({
    sql: `SELECT sportGid FROM sport_favorite WHERE userGid = ?;`,
    args: [id],
  });

  return {
    result: true,
    data: rows.map((row: any) => row.sportGid),
    message: "",
  };
}
