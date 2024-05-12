import SimpleUser from "../user/SimpleUser";

export default interface Message {
  gid: string;
  text: string;
  createdAt: number;
  user: SimpleUser;
}
