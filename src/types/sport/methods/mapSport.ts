import Sport from "../Sport";

const mapSport = (data: any): Sport => {
  const newSport: Sport = {
    gid: data?.sportGid,
    name: data?.sportName,
    icon: data?.sportIcon,
    image: data?.sportImage,
  };
  return newSport;
};

export default mapSport;
