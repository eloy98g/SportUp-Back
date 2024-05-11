import SimpleUser from "../../user/SimpleUser";

const mapAdmin = (data: any): SimpleUser => {
  const newAdmin: SimpleUser = {
    gid: data?.adminGid,
    name: data?.adminName,
    image: data?.adminImage,
  };
  return newAdmin;
};

export default mapAdmin;
