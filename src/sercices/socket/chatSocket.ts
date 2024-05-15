import { Server } from "socket.io";
import CustomSocket from "./types/socket";
import { ChatController } from "../../controllers/chat/chatController";

export default function initializeSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const auth = socket.handshake.headers["authorization"];
    const chat = socket.handshake.headers["chat"];

    if (!auth) {
      return next(new Error("authentication error"));
    }

    if (!chat) {
      return next(new Error("authentication error"));
    }

    const gid = auth.split(" ")[1]; // Suponiendo que el token está en el formato "Bearer <token>"
    const chatGid = chat.toString();

    if (!gid || gid === "null" || !chatGid) {
      return next(new Error("invalid gid"));
    }

    socket.gid = gid;
    socket.chatGid = chatGid;
    socket.join(chatGid);
    next();
  });

  io.on("connection", (socket: CustomSocket) => {

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("message", async (msg) => {
      try {
        const response = await ChatController.createMessage(
          socket.chatGid,
          msg
        );

        if (response.status === "success") {
          if (socket.chatGid) {
            io.to(socket.chatGid).emit("message", msg);
          }
          socket.broadcast.emit("message", msg);
        }else{
          console.log('error al crear el mensaje en la bbdd', response.message)
        }
      } catch (error) {
        console.error(
          "Error al guardar el mensaje en la base de datos:",
          error
        );
      }
    });

    socket.on("error", (err: any) => {
      console.error("Socket error:", err);
    });
  });
}
