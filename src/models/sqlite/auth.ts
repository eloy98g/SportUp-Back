import Credential from "../../types/auth/Credential";
import NewUser from "../../types/auth/NewUser";
import mapUser from "../../types/methods/mapUser";
import { connection } from "./dbConnection";

export class AuthModel {
  static async newUser(input: NewUser) {
    const {
      email,
      password,
      gender,
      emailVerified,
      phoneVerified,
      creationDate,
    } = input;

    const { rows: userExists } = await connection.execute({
      sql: "SELECT * FROM USER WHERE email = ?;",
      args: [email],
    });

    if (userExists.length > 0) {
      return false;
    }

    const { rows: result }  = await connection.execute({
      sql: "INSERT INTO USER (email, password, gender, emailVerified, phoneVerified, creationDate) VALUES (?, ?, ?, ?, ?, ?) RETURNING *;",
      args: [
        email,
        password,
        gender,
        emailVerified,
        phoneVerified,
        creationDate,
      ],
    });

    if (result.length > 0) {
      return mapUser(result[0]);
    }

    return null;
  }

  static async signin(input: Credential) {
    const { email, password } = input;

    const { rows: result } = await connection.execute({
      sql: "SELECT * FROM USER WHERE email = ? AND password = ?;",
      args: [email, password],
    });

    if (result.length > 0) {
      return mapUser(result[0]);
    }

    return null;
  }
}
