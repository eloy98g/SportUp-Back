import mapSimpleUser from "../../user/methods/mapSimpleUser";
import Message from "../Message";

const mapMessage = (data: any): Message => {
  const sender = {
    gid: data?.senderGid,
    name: data?.senderName,
    image: data?.senderImage,
  };
  const newSport: Message = {
    gid: data?.messageGid,
    text: data?.messageContent,
    user: mapSimpleUser(sender),
    createdAt: data?.messageDate,
  };
  return newSport;
};

export default mapMessage;
