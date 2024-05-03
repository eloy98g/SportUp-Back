import { connection } from "../../dbConnection";

// Types
import mapActivity from "../../../types/activity/methods/mapActivity";

// Utils
import getPrice from "../../../utils/getPrice";
import { baseActivityQuery } from "../baseActivityQuery";

export async function getAll(input: any) {
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
