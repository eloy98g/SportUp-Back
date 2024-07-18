import { v4 as uuidv4 } from "uuid";
import { connection } from "../../dbConnection";
import getActivityByCode from "../utils/getActivityByCode";
import getActivityData from "../utils/getActivityData";
import getApplication from "../utils/getApplication";
import getUserTeam from "../utils/getUserTeam";
import joinUser from "../utils/joinUser";

export async function create(input: any) {
	const { activityGid: actGid, userGid, code = null } = input;

	let activityGid = actGid;
	if (!actGid && code) {
		const codeActGid = await getActivityByCode(code);

		if (!codeActGid) {
			return {
				result: false,
				message: "El código no corresponde con ninguna actividad",
				data: "",
			};
		}
		activityGid = codeActGid;
	}
	const { access, status } = await getActivityData(activityGid);
	const userTeam = await getUserTeam(userGid, activityGid);
	const alreadyApplied = await getApplication(userGid, activityGid);

	if (status !== "pending") {
		return {
			result: false,
			message: "La actividad ya no permite solicitudes.",
			data: "",
		};
	}

	if (!access) {
		return {
			result: false,
			message: "No se ha encontrado la actividad",
			data: "",
		};
	}

	if (userTeam) {
		return {
			result: false,
			message: "Este usuario ya pertenece a la actividad",
			data: "",
		};
	}

	if (alreadyApplied) {
		return {
			result: false,
			message: "Este usuario ya ha solicitado unirse",
			data: "",
		};
	}

	const date = Date.now();
	const gid = uuidv4();
	const applicationStatus = access === "open" ? "accepted" : "pending";

	const sql = `INSERT INTO application (gid, creationDate, activityGid, userGid, status) VALUES (?, ?, ?, ?, ?);`;
	const args = [gid, date, activityGid, userGid, applicationStatus];
	const { rowsAffected } = await connection.execute({ sql, args });

	if (rowsAffected === 0) {
		return { result: false, message: "Error creando la solicitud", data: "" };
	}

	if (access === "open") {
		const joinResult = await joinUser(activityGid, userGid, gid);

		if (joinResult.result) {
			return {
				...joinResult,
				data: { activityGid, joinType: "automatic" },
				message: "",
			};
		} else {
			return { ...joinResult, data: "" };
		}
	} else {
		return {
			result: true,
			data: { activityGid, joinType: "administrated" },
			message: "",
		};
	}
}
