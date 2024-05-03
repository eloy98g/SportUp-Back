import Score from "../../../types/activity/Score";
import { connection } from "../../dbConnection";

export async function createResult(gid: string, body: any) {
  try {
    const { scores } = body;

    const { rows } = await connection.execute({
      sql: `SELECT * FROM slot WHERE activityGid = ?;`,
      args: [gid],
    });

    if(rows.length > 0) {
      return {
        result: false,
        message: "Esta actividad ya tiene resultados asignados.",
      };
    }else{
      const scorePromises = scores.map(async (score: Score) => {
        const { team, points, position } = score;
        const sql = `INSERT INTO slot (activityGid, teamGid, points, position) VALUES (?, ?, ?, ?);`;
        const args = [gid, team, points, position];
        const { rowsAffected } = await connection.execute({ sql, args });
  
        if (rowsAffected === 0) {
          throw new Error(
            `No se pudo actualizar: Equipo: ${team}, Actividad: ${gid}`
          );
        }
      });
  
      await Promise.all(scorePromises);
  
      return { result: true, data: true, message: "" };
    }

    
  } catch (error: any) {
    return {
      result: false,
      message: error.message,
    };
  }
}
