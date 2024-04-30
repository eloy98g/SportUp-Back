import Activity from "../Activity";
import mapLocation from "../../methods/mapLocation";
import mapTeams from "./mapTeams";
import mapResults from "./mapResults";
import mapSport from "../../sport/methods/mapSport";

const mapActivity = (data: any): Activity => {
  const newUser: Activity = {
    gid: data?.gid || "",
    location: mapLocation(data),
    visibility: data?.visibility || "",
    creationDate: data?.creationDate || "",
    startDate: data?.startDate || 0,
    duration: data?.duration || 0,
    admin: data?.admin || "",
    access: data?.access || "open",
    type: data?.type || "normal",
    price: data?.price || 0,
    name: data?.name || 0,
    description: data?.description || 0,
    sport: mapSport(data),
    playersPerTeam: data?.playersPerTeam || 0,
    status: data?.status || "draft",
    chat: data?.chat || 0,
    teams: mapTeams(data),
    result: mapResults(data),
  };

  return newUser;
};

export default mapActivity;