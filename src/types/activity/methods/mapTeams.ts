import Team from "../Team";

const mapTeams = (teams: any): Team[] => {
  console.log('teams',teams)
  const newTeams: Team[] = JSON.parse(teams.teamPlayers);
  return newTeams;
};

export default mapTeams;
