import Team from "../Team";

const mapTeams = (teams: any): Team[] => {
  const newTeams: Team[] = JSON.parse(teams.teamPlayers);
  return newTeams;
};

export default mapTeams;
