import Location from "../Location";
import Score from "./Score";
import Team from "./Team";
import Sport from "../sport/Sport";

export type SortBy = "recent" | "numPlayers" | "closest";
export type PriceSlot = "0€" | "1€-5€" | "5€-10€" | "10€-15€" | "15€";
export type ActivityType = "normal" | "competitive";
export type ActivityAccess = "open" | "closed";
export type ActivityVisibility = "public" | "private";
export type ActivityStatus =
  | "draft"
  | "pending"
  | "closed"
  | "ongoing"
  | "waitingScore"
  | "finished";

export default interface Activity {
  gid: number;
  location: Location;
  visibility: ActivityVisibility;
  creationDate: number;
  startDate: number;
  duration: number;
  admin: number;
  access: ActivityAccess;
  type: ActivityType;
  price: number;
  name: string;
  description: string;
  sport: Sport;
  playersPerTeam: number;
  status: ActivityStatus;
  teams: Team[];
  result: Score[];
  chat: number;
}
