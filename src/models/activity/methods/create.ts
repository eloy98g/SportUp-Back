import generateActivityCode from "../../../utils/generateActivityCode";
import { ActivityModel } from "../../activity/activityModel";
import { connection } from "../../dbConnection";
import { v4 as uuidv4 } from "uuid";

export async function create(input: any) {
  const {
    userGid,
    sport,
    name,
    teams,
    playersPerTeam,
    access,
    visibility,
    type,
    price,
    lat,
    lng,
    address,
    dateStart,
    duration,
    description,
  } = input;

  const gid = uuidv4();
  const creationDate = Date.now();
  const status = "pending";
  const code = generateActivityCode();

  const { rowsAffected: creation } = await connection.execute({
    sql: `INSERT INTO activity (gid, admin, sportGid, creationDate, teams, playersPerTeam, access, visibility, type, price, dateStart, duration, description, name, code, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    args: [
      gid,
      userGid,
      sport,
      creationDate,
      teams,
      playersPerTeam,
      access,
      visibility,
      type,
      price,
      dateStart,
      duration,
      description,
      name,
      code,
      status,
    ],
  });

  const { rowsAffected: locationCreated } = await connection.execute({
    sql: `UPDATE location_activity
          SET latitude = ?,
              longitude = ?,
              address  = ?
          WHERE activityGid = ?;`,
    args: [lat, lng, address || null, gid],
  });

  const activity = ActivityModel.getById(gid);

  if (activity && creation && locationCreated) return activity;

  return false;
}
