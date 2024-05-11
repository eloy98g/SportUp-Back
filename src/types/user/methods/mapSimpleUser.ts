import SimpleUser from "../SimpleUser";

const mapSimpleUser = (data: any): SimpleUser => {
  const newUser: SimpleUser = {
    gid: data?.gid || "",
    name: data?.name || "",
    image: data?.image || "",
  };

  return newUser;
};

export default mapSimpleUser;
