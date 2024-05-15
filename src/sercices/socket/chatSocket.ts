import { Server } from "socket.io";
import CustomSocket from "./types/socket";
// import {ChatController} from "../controllers/chat/chatController"

export default function initializeSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const auth = socket.handshake.headers["authorization"];
    const chat = socket.handshake.headers["chat"];

    if (!auth) {
      return next(new Error("authentication error"));
    }

    const gid = auth.split(" ")[1]; // Suponiendo que el token está en el formato "Bearer <token>"
    const chatGid = chat;

    if (!gid || gid === "null" || !chatGid) {
      return next(new Error("invalid gid"));
    }

    socket.gid = gid;
    socket.chatGid = chatGid;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    console.log("a user connected with gid:", socket.gid);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("message:create", async (msg) => {
      console.log('message: ' + JSON.stringify(msg));
      // // Guardar el mensaje en la base de datos usando ChatController
      // try {
      //   await ChatController.createMessage(socket.chatGid, msg);
      // } catch (error) {
      //   console.error('Error al guardar el mensaje en la base de datos:', error);
      // }
      // // Emitir el mensaje a todos los clientes conectados
      socket.broadcast.emit("message", msg);
    });

    socket.on("error", (err: any) => {
      console.error("Socket error:", err);
    });
  });
}
