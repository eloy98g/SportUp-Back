import SimpleUser from "../../user/SimpleUser";
import Application from "../Application";

const mapApplication = (data: any): Application => {
  const newApplication: Application = {
    gid: data.gid,
    status: data.status,
    user: {
      gid: data.userGid,
      name: data.name,
      image: data.image,
    } as SimpleUser,
  };
  return newApplication;
};

export default mapApplication;
