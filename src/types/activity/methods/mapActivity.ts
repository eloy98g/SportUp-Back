import Activity from "../Activity";
import mapLocation from "../../methods/mapLocation";
import mapTeams from "./mapTeams";
import mapResults from "./mapResults";

const mapActivity = (data: any): Activity => {
  const newUser: Activity = {
    gid: parseInt(data?.gid) || 0,
    location: mapLocation(data),
    visibility: data?.visibility || "",
    creationDate: data?.creationDate || "",
    startDate: data?.startDate || 0,
    duration: data?.duration || 0,
    admin: parseInt(data?.admin) || 0,
    access: data?.access || "open",
    type: data?.type || "normal",
    price: data?.price || 0,
    name: data?.name || 0,
    description: data?.description || 0,
    sport: data?.sportGid || 0,
    playersPerTeam: data?.playersPerTeam || 0,
    status: data?.status || "draft",
    chat: data?.chat || 0,
    teams: mapTeams(data),
    result: mapResults(data),
  };

  return newUser;
};

export default mapActivity;
