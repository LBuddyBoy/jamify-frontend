import PlaylistCard from "../../components/PlaylistCard";
import "./style/playlists.css";
import { match } from "../../utils/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchPlaylists } from "../../api/api";
import { usePlaylist } from "../../context/PlaylistContext";
import PlaylistsHeader from "./components/PlaylistsHeader";
import CreatePlaylistButton from "./components/CreatePlaylistButton";
import { useAuth } from "../../context/AuthContext";

export default function PlaylistsPage() {
  const { user } = useAuth();
  const {
    data: playlists,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => fetchPlaylists({ userId: user.id }),
  });
  const { search } = usePlaylist();

  if (isPending || !playlists) {
    return <span>Loading</span>;
  }

  if (isError) {
    return <span>Error: {error} </span>;
  }

  const filtered = playlists.filter((playlist) => match(playlist.name, search));

  return (
    <div className="playlistsContainer">
      <PlaylistsHeader />
      <CreatePlaylistButton />
      <div className="playlistCards">
        {filtered.map((playlist) => {
          return <PlaylistCard key={playlist.id} playlist={playlist} />;
        })}
      </div>
    </div>
  );
}
