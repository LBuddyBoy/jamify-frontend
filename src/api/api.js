import axios from "./axios";

export const fetchPlaylists = async ({ userId, page, limit }) => {
  const params = [];

  if (userId) params.push(`userId=${userId}`);
  if (page) params.push(`page=${page}`);
  if (limit) params.push(`limit=${limit}`);

  const res = await axios.get(
    `/playlists${params.length > 0 ? "?" + params.join("&") : ""}`
  );

  return res.data;
};

export const fetchAlbums = async ({ page, limit }) => {
  const params = [];

  if (page) params.push(`page=${page}`);
  if (limit) params.push(`limit=${limit}`);

  const res = await axios.get(
    `/albums${params.length > 0 ? "?" + params.join("&") : ""}`
  );

  return res.data;
};

export const createPlaylist = async (name) => {
  const response = await axios.post("/playlists", { name });

  return response.data;
};

export const updatePlaylist = async (playlistId, body) => {
  const response = await axios.put("/playlists/" + playlistId, body);

  return response.data;
};

export const updateUser = async (userId, body) => {
  const response = await axios.put("/users/" + userId, body);

  return response.data;
};

export const fetchArtistAlbums = async (artistId) => {
  const response = await axios.get("/artists/" + artistId + "/albums");

  return response.data;
};

export const fetchArtistSongs = async (artistId) => {
  const response = await axios.get("/artists/" + artistId + "/songs");

  return response.data;
};

export const addListenToSong = async (songId) => {
  const response = await axios.put("/songs/" + songId + "/listened");

  return response.data;
};

export const addSongToPlaylist = async (playlistId, songId) => {
  return await axios
    .post(`/playlists/${playlistId}/songs/${songId}`)
    .catch((error) => {
      if (error.response.status === 400) {
        return {
          error: "That playlist already has this song.",
          success: false,
        };
      }
      throw error;
    });
};
