import Player from "../../user/Player";
import Application from "../Application";

const mapApplication = (data: any): Application => {
  const newApplication: Application = {
    gid: data.gid,
    status: data.status,
    user: {
      gid: data.userGid,
      name: data.name,
      image: data.image,
    } as Player,
  };
  return newApplication;
};

export default mapApplication;
