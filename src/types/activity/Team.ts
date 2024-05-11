import SimpleUser from "../user/SimpleUser";

type Team = {
  gid: string;
  name: string;
  players: SimpleUser[];
};

export default Team;
