import mapActivity from "../types/activity/methods/mapActivity";
import getPrice from "../utils/getPrice";
import { connection } from "./dbConnection";

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
      visibility= null,
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
}
