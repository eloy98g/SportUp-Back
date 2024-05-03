import { connection } from "../../dbConnection";

export async function updateTeams(gid: string, input: any) {
  try {
    const promises = input.teams.map(async (team: any) => {
      const { gid: teamGid, players } = team;

      const playerPromises = players.map(async (playerGid: string) => {
        const sql = `UPDATE user_team SET teamGid = ? WHERE userGid = ? AND activityGid = ?;`;

        const { rowsAffected } = await connection.execute({
          sql,
          args: [teamGid, playerGid, gid],
        });

        if (rowsAffected === 0) {
          throw new Error(
            `No se pudo actualizar: Equipo: ${teamGid}, Jugador: ${playerGid}, Actividad: ${gid}`
          );
        }
      });

      await Promise.all(playerPromises);
    });

    await Promise.all(promises);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
