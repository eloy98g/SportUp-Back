import Location from "../Location";

export interface User {
  gid: string;
  name?: string;
  email: string;
  phone?: number;
  image?: string;
  description?: string;
  location: Location;
  birthDate?: number;
  creationDate?: number;
  phoneVerified: boolean;
  emailVerified: boolean;
  gender: string;
}
