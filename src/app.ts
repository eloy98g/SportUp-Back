import express, { Application, json } from "express";
import http from "http";
import { Server } from "socket.io";
import CustomSocket from "./types/socket"; 

// Middlewares
import { corsMiddleware } from "./middlewares/cors";

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
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.use((socket: CustomSocket, next) => {
  const auth = socket.handshake.headers['authorization'];
  const chat = socket.handshake.headers['chat'];

  if (!auth) {
    return next(new Error('authentication error'));
  }

  const gid = auth.split(' ')[1]; // Suponiendo que el token está en el formato "Bearer <token>"
  const chatGid  = chat

  if (!gid || gid === 'null' || !chatGid) {
    return next(new Error('invalid gid'));
  }

  socket.gid = gid
  socket.chatGid = chatGid
  next();
});

io.on('connection', (socket: CustomSocket) => {
  console.log('a user connected with gid:', socket.gid);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message:create', (msg) => {
    console.log('message: ' + msg);
    socket.broadcast.emit('message', msg);
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
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

server.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
