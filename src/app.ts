import express, { Application, json } from "express";
import http from "http";
import { Server } from "socket.io";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import initializeSocket from "./sercices/socket/chatSocket";

// Middlewares
import { ACCEPTED_ORIGINS, corsMiddleware } from "./middlewares/cors";

// Routes
import { activityRouter } from "./routes/activityRouter";
import { applicationRouter } from "./routes/applicationRouter";
import { authRouter } from "./routes/authRouter";
import { chatRouter } from "./routes/chatRouter";
import { confirmationRouter } from "./routes/confirmationRouter";
import { reportRouter } from "./routes/reportRouter";
import { reviewRouter } from "./routes/reviewRouter";
import { sportRouter } from "./routes/sportRouter";
import { userRouter } from "./routes/userRouter";

const app: Application = express();
export const PORT = process.env.PORT || 1234;

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ACCEPTED_ORIGINS,
		methods: ["GET", "POST"],
	},
});

const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Sport Up API Documentation",
			version: "1.0.0",
			description: "Sport Up API Information",
			contact: {
				name: "Eloy Gómez García",
			},
			servers: [
				{
					url: `http://localhost:${PORT}`,
				},
			],
		},
	},
	apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/activity", activityRouter);
app.use("/chat", chatRouter);
app.use("/sport", sportRouter);
app.use("/application", applicationRouter);
app.use("/confirmation", confirmationRouter);
app.use("/report", reportRouter);
app.use("/review", reviewRouter);

initializeSocket(io);

server.listen(PORT, () => {
	console.log(`server listening on http://localhost:${PORT}`);
});
