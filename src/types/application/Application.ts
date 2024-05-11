import SimpleUser from "../user/SimpleUser";

export default interface Application {
  gid: string;
  status: string;
  user: SimpleUser;
}
