import { useNavigate } from "react-router";
import "./style/playlistCard.css";
import { useAuth } from "../context/AuthContext";

export default function PlaylistCard({ playlist }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="playlistCard"
      onClick={() => navigate("/playlists/" + playlist.id)}
    >
      <img src={playlist.image_url} />
      <div className="playlistCardInfo">
        <h4>{playlist.name}</h4>
        <p>Playlist • {user.username}</p>
      </div>
    </div>
  );
}
