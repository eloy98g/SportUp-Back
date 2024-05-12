import mapMessage from "../../../types/chat/methods/mapMessage";
import { connection } from "../../dbConnection";

export async function getMessages(gid: string) {
  const { rows: chatExists } = await connection.execute({
    sql: `SELECT gid FROM chat WHERE gid = ?;`,
    args: [gid],
  });

  if (chatExists.length === 0) {
    return { result: false, message: "Chat no encontrado", data: [] };
  }

  const { rows } = await connection.execute({
    sql: `
    SELECT
      m.gid AS messageGid, 
      m.content AS messageContent, 
      m.date AS messageDate,
      u_sender.name AS senderName,
      u_sender.gid AS senderGid,
      u_sender.image AS senderImage
    FROM chat c
    JOIN message m ON c.gid = m.chatGid
    LEFT JOIN user u_sender ON m.sender = u_sender.gid
    WHERE c.gid = ?
    ORDER BY m.date DESC;`,
    args: [gid],
  });

  if (rows.length === 0) {
    return { result: true, message: "No se encontraron mensajes", data: [] };
  }

  const messages = rows.map((row) => mapMessage(row));

  return { result: true, message: "success", data: messages };
}
