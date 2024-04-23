import NewUser from "../../types/auth/NewUser";
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

    const {rows: userExists} = await connection.execute({ sql: "SELECT * FROM USER WHERE email = ?", args: [email] });
    
    if(userExists.length > 0) {
      return false
    }

    const {rows: result} = await connection.execute({
      sql: "INSERT INTO USER (email, password, gender, emailVerified, phoneVerified, creationDate) VALUES (?, ?, ?, ?, ?, ?)",
      args: [
        email,
        password,
        gender,
        emailVerified,
        phoneVerified,
        creationDate,
      ],
    });

    console.log('result: ', result) 
    return result;
  }
}
