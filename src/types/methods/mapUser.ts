import { User } from "../user/User";
import mapLocation from "./mapLocation";

const mapUser = (data: any): User => {
  console.log('datadatadata',data)
  const newUser: User = {
    email: data?.email || "",
    name: data?.name || "",
    gid: data?.gid,
    phone: data?.phone || "",
    image: data?.image || "",
    description: data?.description || "",
    location: mapLocation(data),
    birthDate: data?.birthDate || 0,
    creationDate: data?.creationDate || 0,
    phoneVerified: data?.phoneVerified || false,
    emailVerified: data?.emailVerified || false,
    gender: data?.gender,
  };

  return newUser;
};

export default mapUser;
