import Message from "./Message";

export default interface Chat {
  gid: string;
  name: string;
  lastMessage: Message;
  image: string;
}
