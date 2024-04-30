import Player from "../../user/Player";

const mapAdmin = (data: any): Player => {
  const newAdmin: Player = {
    gid: data?.adminGid,
    name: data?.adminName,
    image: data?.adminImage,
  };
  return newAdmin;
};

export default mapAdmin;
