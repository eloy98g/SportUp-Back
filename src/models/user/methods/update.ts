import { connection } from "../../dbConnection";
import { UserModel } from "../userModel";

export async function update(gid: string, body: any) {
  // TODO: store image in firebase
  const { location, ...rest } = body;

  let setClause = Object.keys(rest)
    .map((key) => (key !== "location" ? `${key} = ?` : ""))
    .join(", ");

  let sql = `UPDATE user SET ${setClause} WHERE gid = ?`;
  let args: any = [...Object.values(rest), gid];

  const { rowsAffected } = await connection.execute({
    sql,
    args,
  });

  if (rowsAffected === 0) {
    return {
      result: false,
      message: "No se han podido actualizar los datos del usuario",
    };
  } else {
    if (location) {
      const { latitude, longitude, latitudeDelta, longitudeDelta, radius } =
        location;
      const { rowsAffected: locationRows } = await connection.execute({
        sql: "UPDATE location_user SET latitude = ?, longitude = ?, latitudeDelta = ?, longitudeDelta = ?,radius = ? WHERE userGid = ?",
        args: [
          latitude,
          longitude,
          latitudeDelta || null,
          longitudeDelta || null,
          radius,
          gid,
        ],
      });

      if (locationRows === 0) {
        return {
          result: false,
          message:
            "No se han podido actualizar los datos de la localización del usuario",
        };
      } else {
        const user = await UserModel.getById(gid);
        if (user) {
          return { result: true, data: user, message: "" };
        }
        return {
          result: false,
          message: "Error recuperando los datos del usuario",
        };
      }
    }
  }
  return  {
    result: true,
    message: "Usuario editado correctamente ",
  };
}
