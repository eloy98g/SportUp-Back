import Chat from "../Chat";
import mapMessage from "./mapMessage";

const mapChat = (data: any): Chat => {
  const newSport: Chat = {
    gid: data?.chatGid,
    name: data?.chatName,
    lastMessage: mapMessage(data),
    image: data?.chatImage,
  };
  return newSport;
};

export default mapChat;
