import Location from "../Location";

const mapLocation = (data: any): Location => {
  const newLocation: Location = {
    latitude: data?.latitude || null,
    longitude: data?.longitude || null,
    latitudeDelta: data?.latitudeDelta,
    longitudeDelta: data?.latitudeDelta,
    address: data?.address,
    radius: data?.radius,
  };
  return newLocation;
};

export default mapLocation;
