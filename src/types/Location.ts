export  default interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
  address?: string;
  radius?: number;
}
