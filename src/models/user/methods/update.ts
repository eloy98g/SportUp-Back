import { uploadImage } from "../../../services/firebase";
import { connection } from "../../dbConnection";
import { UserModel } from "../userModel";

export async function update(gid: string, body: any) {
  // TODO: store image in firebase
  const { image, location, ...rest } = body;

  if (image) {
    const imageName = `${gid}`;
    const imagePath = "users";

    const uploadResult = await uploadImage(image, imageName, imagePath);
    if (!uploadResult.result) {
      return {
        result: false,
        message: "Error al cargar la imagen en Firebase Storage",
      };
    }
    // Si la carga de la imagen es exitosa, actualiza el nombre de la imagen en la base de datos
    rest.image = imageName;
    console.log("imageName", imageName);
  }

  let setClause = Object.keys(rest)
    .map((key) => (key !== "location" ? `${key} = ?` : ""))
    .join(", ");

  let sql = `UPDATE user SET ${setClause} WHERE gid = ?`;

  let args: any = [...Object.values(rest), gid];

  const { rowsAffected } = await connection.execute({
    sql,
    args,
  });

  const { lat, lng, radius } = location;
  if (rowsAffected === 0) {
    return {
      result: false,
      message: "No se han podido actualizar los datos del usuario",
    };
  } else {
    const { rowsAffected: location } = await connection.execute({
      sql: "UPDATE location_user SET latitude = ?, longitude = ?, radius = ? WHERE userGid = ?",
      args: [lat, lng, radius, gid],
    });
    if (location === 0) {
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
