import cors from "cors";

export const ACCEPTED_ORIGINS = [
	"http://localhost:8080",
	"http://localhost:1234",
	process.env.DOMAIN_DEV || "",
	process.env.DOMAIN_PROD || "",
	process.env.DOMAIN_WEBAPP || "",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
	cors({
		origin: (origin: any, callback: any) => {
			if (acceptedOrigins.includes(origin)) {
				return callback(null, true);
			}

			if (!origin) {
				return callback(null, true);
			}

			return callback(new Error("Not allowed by CORS"));
		},
	});
