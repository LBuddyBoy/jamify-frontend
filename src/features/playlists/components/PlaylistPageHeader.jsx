import { Link } from "react-router";
import { totalDuration } from "../../../utils/utils";

export default function PlaylistPageHeader({ playlist }) {
  return (
    <>
      <header className="playlistHeader">
        <img src={playlist.image_url} alt={playlist.name + " playlist cover"} />
        <div className="playlistHeaderInfo">
          <h1 className="playlist-title">{playlist.name}</h1>
          {playlist.description && (
            <p className="playlist-description">{playlist.description}</p>
          )}
          <div className="playlist-meta">
            <span>
              <Link
                className="playlist-owner"
                to={"/users/" + playlist.owner_id}
              >
                {playlist.owner.username}
              </Link>{" "}
              • {playlist.songs.length} songs • {totalDuration(playlist.songs)}
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
