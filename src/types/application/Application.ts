import Player from "../user/Player";

export default interface Application {
  gid: string;
  status: string;
  user: Player;
}
