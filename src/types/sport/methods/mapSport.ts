import Sport from "../Sport";

const mapSport = (data: any): Sport => {
  const newSport: Sport = {
    gid: data?.sportGid,
    name: data?.sportName,
    icons: { black: data?.sportIconBlack, white: data?.sportIconWhite },
    image: data?.sportImage,
  };
  return newSport;
};

export default mapSport;
