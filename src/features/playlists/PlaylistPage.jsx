import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "../../api/axios";
import SongCard from "../../components/SongCard";
import "./style/playlistPage.css";
import PlaylistPageHeader from "./components/PlaylistPageHeader";
import PlaylistPageSettings from "./components/PlaylistPageSettings";

export default function PlaylistPage() {
  const { id } = useParams();
  const {
    data: playlist,
    isError,
    isPending,
    error,
  } = useQuery({
    queryKey: ["playlist", id],
    queryFn: async () => {
      return (await axios.get("/playlists/" + id)).data;
    },
  });

  if (isPending || !playlist) {
    return <span>Loading…</span>;
  }

  if (isError) {
    return <span>Error: {error?.message || error}</span>;
  }

  return (
    <div className="playlistInfoContainer">
      <PlaylistPageHeader playlist={playlist} />
      <PlaylistPageSettings playlist={playlist} />
      <div className="playlistSongs">
        {playlist.songs.length === 0 && <p>No songs in this playlist yet.</p>}
        {playlist.songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
