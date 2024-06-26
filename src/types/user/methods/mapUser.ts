import { User } from "../User";
import mapLocation from "../../methods/mapLocation";

const mapUser = (data: any): User => {
  const newUser: User = {
    email: data?.email || "",
    name: data?.name || "",
    gid: data?.gid,
    phone: data?.phone || "",
    image: data?.image || "",
    description: data?.description || "",
    location: mapLocation(data),
    birthdate: data?.birthdate || 0,
    creationDate: data?.creationDate || 0,
    phoneVerified: data?.phoneVerified || false,
    emailVerified: data?.emailVerified || false,
    gender: data?.gender,
  };

  return newUser;
};

export default mapUser;
