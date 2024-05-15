import { connection } from "../../dbConnection";

const chatExists = async (chatGid: string) => {
  const { rows } = await connection.execute({
    sql: `SELECT * FROM chat WHERE gid = ?;`,
    args: [chatGid],
  });

  if (rows.length === 0) {
    return false;
  }
  return true;
};

const userExists = async (userGid: string) => {
  const { rows } = await connection.execute({
    sql: `SELECT * FROM user WHERE gid = ?;`,
    args: [userGid],
  });

  if (rows.length === 0) {
    return false;
  }
  return true;
};

export async function createMessage(chatGid: string, message: any) {
  const chatResult = await chatExists(chatGid);

  if (!chatResult) {
    return { result: false, message: "Chat no encontrado", data: [] };
  }

  const userResult = await userExists(message.user._id);

  if (!userResult) {
    return { result: false, message: "El usuario no existe", data: [] };
  }

  const { text, user, createdAt, _id } = message;

  const date = new Date(createdAt).getTime();
  const { rowsAffected } = await connection.execute({
    sql: `INSERT INTO message (gid, chatGid, sender, date, content) VALUES (?, ?, ?, ?, ?);`,
    args: [_id, chatGid, user._id, date, text],
  });

  if (rowsAffected === 1) {
    return {
      result: true,
      data: "Mensaje creado correctamente",
      message: [],
    };
  }
  return {
    result: false,
    message: "Error al crear el mensaje",
    data: [],
  };
}
