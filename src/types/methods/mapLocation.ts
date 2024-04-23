import { Location } from "../Location";

const mapLocation = (data: any): Location => {
  const newLocation: Location = {
    latitude: data?.latitude || null,
    longitude: data?.longitude || null,
    latitudeDelta: data?.latitudeDelta,
    longitudeDelta: data?.latitudeDelta,
    address: data?.latitudeDelta,
    radius: data?.latitudeDelta,
  };
  return newLocation;
};

export default mapLocation;
