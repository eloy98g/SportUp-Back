import activityExists from "../../../utils/validations/activityExists";
import userExistsByGid from "../../../utils/validations/userExistsByGid";
import { connection } from "../../dbConnection";
import { v4 as uuidv4 } from "uuid";
import userAlreadyReviewd from "../utils/userAlreadyReviewed";

export async function create(input: any) {
  const {
    activityGid = null,
    rating = null,
    comment = null,
    reviewedBy = null,
    users = [],
  } = input;

  const activity = await activityExists(activityGid);
  const userExists = await userExistsByGid(reviewedBy);

  if (!activity) {
    return { result: false, message: "La actividad no existe", data: [] };
  }

  if (!userExists) {
    return {
      result: false,
      message: "Error obteniendo los datos del usuario",
      data: [],
    };
  }

  const userPromises = users.map(async (user: string) => {
    const userExists = await userExistsByGid(user);

    if (!userExists) {
      throw new Error(`El usuario con id ${user} no existe.`);
    }
    const userReviewed = await userAlreadyReviewd(
      user,
      reviewedBy,
      activityGid
    );

    if (userReviewed) {
      throw new Error(
        `Estás intentando valorar a un usuario al que ya has valorado`
      );
    }
  });

  try {
    await Promise.all(userPromises);
  } catch (error: any) {
    return { result: false, message: error.message, data: [] };
  }

  const gid = uuidv4();
  const date = Date.now();
  const sql = `INSERT INTO activity_review (gid, activityGid, rating, comment, reviewedBy, createdAt) values (?,?,?,?,?,?)`;
  const args: string[] = [gid, activityGid, rating, comment, reviewedBy, date];
  const { rowsAffected } = await connection.execute({ sql, args });

  if (rowsAffected === 0) {
    return { result: false, message: "Error al crear la valoración", data: [] };
  } else {
    const userPromises = users.map(async (user: string) => {
      const sql = `INSERT INTO review_user (userGid, reviewGid) VALUES (?, ?);`;
      const args = [user, gid];
      const { rowsAffected } = await connection.execute({ sql, args });

      if (rowsAffected === 0) {
        throw new Error(`No se pudo asignar review al usuario ${user}`);
      }
    });

    try {
      await Promise.all(userPromises);
    } catch (error: any) {
      return { result: false, message: error.message, data: [] };
    }
    return { result: true, message: "Review creada con éxito", data: [] };
  }
}
