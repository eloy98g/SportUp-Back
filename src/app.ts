import express, { Application, json } from "express";
import http from "http";
import { Server } from "socket.io";
import initializeSocket from "./sercices/socket/chatSocket";

// Middlewares
import { ACCEPTED_ORIGINS, corsMiddleware } from "./middlewares/cors";

// Routes
import { activityRouter } from "./routes/activityRouter";
import { userRouter } from "./routes/userRouter";
import { chatRouter } from "./routes/chatRouter";
import { sportRouter } from "./routes/sportRouter";
import { authRouter } from "./routes/authRouter";
import { applicationRouter } from "./routes/applicationRouter";

const app: Application = express();
export const PORT = process.env.PORT || 1234;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ACCEPTED_ORIGINS,
    methods: ["GET", "POST"]
  }
});

app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/activity", activityRouter);
app.use("/chat", chatRouter);
app.use("/sport", sportRouter);
app.use("/application", applicationRouter);

initializeSocket(io);

server.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
