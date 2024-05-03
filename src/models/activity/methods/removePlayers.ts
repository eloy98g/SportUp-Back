import { connection } from "../../dbConnection";

export async function removePlayers(gid: string, input: any) {
  const { players } = input;
  try {
    const playerPromises = players.map(async (playerGid: string) => {
      const sql = `DELETE FROM user_team WHERE userGid = ? AND activityGid = ?;`;

      const { rowsAffected } = await connection.execute({
        sql,
        args: [playerGid, gid],
      });

      if (rowsAffected === 0) {
        throw new Error(
          `No se pudo eliminar: Jugador: ${playerGid}, Actividad: ${gid}`
        );
      }
    });

    await Promise.all(playerPromises);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}