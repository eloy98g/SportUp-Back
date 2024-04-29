import Score from "../Score";

const mapResults = (data: any): Score[] => {
  const newScores: Score[] = JSON.parse(data.result);
  return newScores;
};

export default mapResults;
