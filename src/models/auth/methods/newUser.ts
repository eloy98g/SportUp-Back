import { connection } from "../../dbConnection";

// Types
import mapUser from "../../../types/user/methods/mapUser";

// Utils
import getPasswordHash from "../../../utils/getPasswordHash";

export async function newUser(input: any) {
  const email = input.email;
  const password = getPasswordHash(input.password);
  const creationDate = Math.floor(Date.now() / 1000);
  const phoneVerified = false;
  const emailVerified = false;
  const gender = "NS/NC";

  const { rows: userExists } = await connection.execute({
    sql: "SELECT * FROM USER WHERE email = ?;",
    args: [email],
  });

  if (userExists.length > 0) {
    return { result: false, message: "El usuario ya existe." };
  }

  const { rows: result } = await connection.execute({
    sql: "INSERT INTO USER (email, password, gender, emailVerified, phoneVerified, creationDate) VALUES (?, ?, ?, ?, ?, ?) RETURNING *;",
    args: [email, password, gender, emailVerified, phoneVerified, creationDate],
  });

  if (result.length > 0) {
    return { result: true, data: mapUser(result[0]), message: "" };
  }

  return { result: false, message: "Error creando usuario." };
}
