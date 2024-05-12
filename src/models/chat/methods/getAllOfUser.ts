import mapChat from "../../../types/chat/methods/mapChat";
import { connection } from "../../dbConnection";

export async function getAllOfUser(userGid: string) {
  const { rows } = await connection.execute({
    sql: `SELECT 
      c.gid AS chatGid,
      c.image AS chatImage, 
      a.name AS chatName, 
      m.gid AS messageGid, 
      m.content AS messageContent, 
      m.date AS messageDate,
      u_sender.name AS senderName,
      u_sender.gid AS senderGid,
      u_sender.image AS senderImage
  FROM 
      chat c
  JOIN 
      user_team ut ON c.activityGid = ut.activityGid
  JOIN 
      activity a ON c.activityGid = a.gid
  JOIN 
      user u ON ut.userGid = u.gid
  LEFT JOIN 
      (SELECT 
          chatGid, MAX(date) AS max_date
      FROM 
          message
      GROUP BY 
          chatGid) AS latest_message ON c.gid = latest_message.chatGid
  LEFT JOIN 
      message m ON c.gid = m.chatGid AND latest_message.max_date = m.date
  LEFT JOIN 
      user u_sender ON m.sender = u_sender.gid
  WHERE 
      u.gid = ?;`,
    args: [userGid],
  });

  if (rows.length === 0) {
    return { result: true, message: "No se encontraron chat", data: [] };
  }

  const chats = rows.map((row) => mapChat(row));

  return { result: true, message: "success", data: chats };
}
