export const fetchSongsById = async songId => {
  const data = await fetch(
    `https://api.genius.com/songs/${songId}?access_token=${process.env.REACT_APP_CLIENT_ACCESS_TOKEN}`
  );
  const res = await data.json();
  return res;
};

export const fetchSearchedSongs = async searchStr => {
  // console.log(process.env.REACT_APP_CLIENT_ACCESS_TOKEN)
  const data = await fetch(
    `https://api.genius.com/search?q=${searchStr}&access_token=${process.env.REACT_APP_CLIENT_ACCESS_TOKEN}`
  );
  const res = await data.json();

  return res;
};
