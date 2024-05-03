export const baseActivityQuery = `
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
