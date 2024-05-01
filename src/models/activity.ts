import mapActivity from "../types/activity/methods/mapActivity";
import getPrice from "../utils/getPrice";
import { v4 as uuidv4 } from "uuid";
import { connection } from "./dbConnection";
import generateActivityCode from "../utils/generateActivityCode";

const baseActivityQuery = `
  SELECT a.*, c.gid AS chat, l.*,
  sp.gid AS sportGid, sp.name AS sportName, sp.icon_white AS sportIconWhite, sp.icon_black AS sportIconBlack, sp.image AS sportImage,
  ua.gid AS adminGid, ua.name AS adminName, ua.image AS adminImage,
  (SELECT 
    json_group_array(json_object(
        'gid', t.gid,
        'name', t.name,
        'players', 
            (SELECT 
              json_group_array(json_object(
                'gid', u.gid,
                'name', u.name,
                'image', u.image
            )) 
            FROM user_team ut
            JOIN user u ON ut.userGid = u.gid
            WHERE t.gid = ut.teamGid)
    ))
    FROM team t 
    WHERE t.activityGid = a.gid) AS teamPlayers,
  (SELECT 
  json_group_array(
    json_object(
        'gid',s.gid,
        'team', t.name,
        'points', s.points,
        'position', s.position
    )
  ) AS result
  FROM slot s
  JOIN team t ON s.teamGid = t.gid
  WHERE s.activityGid = a.gid) AS result
  FROM  activity a
  LEFT JOIN chat c ON a.gid = c.activityGid
  LEFT JOIN location_activity l ON a.gid = l.activityGid
  LEFT JOIN sport sp ON a.sportGid = sp.gid
  LEFT JOIN user ua ON a.admin = ua.gid
  `;

export class ActivityModel {
  static async getAll(input: any) {
    const {
      admin = null,
      userGid = null,
      price = null,
      status = [],
      type = null,
      visibility = null,
      sports = [],
    } = input;

    const realPrice = getPrice(input.price);
    const sportsArray =
      sports.length > 0
        ? `AND sportGid IN (${sports.map(() => "?").join(",")})`
        : "";

    const statusArray =
      status.length > 0
        ? `AND status IN (${status.map(() => "?").join(",")})`
        : "";

    const { rows } = await connection.execute({
      sql: `${baseActivityQuery}
        WHERE (? IS NULL OR a.admin = ?)
        AND (? IS NULL OR a.gid IN (SELECT ut.activityGid FROM user_team ut WHERE ut.userGid = ?))
        AND (? is NULL OR (a.price >= ? AND a.price <= ?))
        AND (? IS NULL OR a.type = ?)
        AND (? IS NULL OR a.visibility = ?)
        ${statusArray}
        ${sportsArray};`,
      args: [
        admin,
        admin,
        userGid,
        userGid,
        price,
        realPrice?.min,
        realPrice?.max,
        type,
        type,
        visibility,
        visibility,
        ...status,
        ...sports,
      ],
    });

    if (rows.length === 0) return [];

    const parsedRows = rows.map((row: any) => mapActivity(row));
    return parsedRows;
  }
  static async getById(gid: string) {
    const { rows } = await connection.execute({
      sql: `${baseActivityQuery} WHERE a.gid = ?;`,
      args: [gid],
    });

    if (rows.length === 0) return null;

    const activity = mapActivity(rows[0]);
    return activity;
  }

  static async create(input: any) {
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

  static async delete(gid: string) {
    const result = await connection.execute({
      sql: "DELETE FROM activity WHERE gid = ?;",
      args: [gid],
    });

    if (result.rowsAffected > 0) {
      return true;
    }
    return null;
  }

  static async update(gid: string, input: any) {
    let setClause = Object.keys(input)
      .map((key) => `${key} = ?`)
      .join(", ");

    let sql = `UPDATE activity SET ${setClause} WHERE gid = ?`;

    let args: any = [...Object.values(input), gid];
    const { rowsAffected } = await connection.execute({
      sql,
      args,
    });

    if (rowsAffected > 0) {
      return ActivityModel.getById(gid);
    }

    return false;
  }

  static async updateTeams(gid: string, input: any) {
    try {
      const promises = input.teams.map(async (team: any) => {
        const { teamGid, players } = team;

        const playerPromises = players.map(async (playerGid: string) => {
          const sql = `UPDATE user_team SET teamGid = ? WHERE userGid = ? AND activityGid = ?;`;

          const { rowsAffected } = await connection.execute({
            sql,
            args: [teamGid, playerGid, gid],
          });

          if (rowsAffected === 0) {
            throw new Error(
              `No se pudo actualizar: Equipo: ${teamGid}, Jugador: ${playerGid}, Actividad: ${gid}`
            );
          }
        });

        await Promise.all(playerPromises);
      });

      await Promise.all(promises);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
