import { connection } from "../../dbConnection";

// Types
import mapUser from "../../../types/user/methods/mapUser";

// Utils
import getPasswordHash from "../../../utils/getPasswordHash";

export async function signIn(input: any) {
	const email = input?.email || "";
	const password = getPasswordHash(input?.password) || "";

	const { rows: result } = await connection.execute({
		sql: "SELECT * FROM USER WHERE email = ? AND password = ?;",
		args: [email, password],
	});

	if (result.length > 0) {
		return { result: true, data: mapUser(result[0]), message: "" };
	}

	return { result: false, message: "Email o contraseña incorrectos." };
}
