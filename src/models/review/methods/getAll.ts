import { connection } from "../../dbConnection";
import userExistsByGid from "../../../utils/validations/userExistsByGid";

export async function getAll(input: any) {
  const { userGid = null } = input;

  const user = await userExistsByGid(userGid);

  if (!user) {
    return {
      result: false,
      message: "El usuario no existe",
      data: [],
    };
  }

  const sql = `
  SELECT ar.*
  FROM activity_review ar
  JOIN review_user ru ON ar.gid = ru.reviewGid
  WHERE ru.userGid = ?;`;

  const args = [userGid];

  const { rows } = await connection.execute({ sql, args });

  console.log('rows',rows)
  if (!rows)
    return {
      result: false,
      message: "Error al obtener las valoraciones",
      data: [],
    };

  return {
    result: true,
    message: "",
    data: rows,
  };
}
