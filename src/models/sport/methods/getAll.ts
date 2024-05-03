import mapSport from "../../../types/sport/methods/mapSport";
import { connection } from "../../dbConnection";

export async function getAll() {
  const { rows } = await connection.execute(
    `SELECT 
        s.gid AS sportGid,
        s.image AS sportImage,
        s.name AS sportName,
        s.icon_black AS sportIconBlack,
        s.icon_white AS sportIconWhite
    FROM sport s;`
  );

  if (rows.length === 0) return null;

  const user = rows.map((row) => mapSport(row));

  return user;
}
