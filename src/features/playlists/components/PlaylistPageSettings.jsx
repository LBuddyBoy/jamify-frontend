import { FaPlay } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";
import PlaylistEditMenu from "./PlaylistEditMenu";
import { useAuth } from "../../../context/AuthContext";

export default function PlaylistPageSettings({ playlist }) {
  const { togglePopMenu } = useTheme();
  const { user } = useAuth();

  return (
    <div className="playlistPageSettings">
      <FaPlay className="playPauseBtn" />
      <FaShuffle />
      {user?.id === playlist.owner_id && (
        <>
          <FiEdit onClick={togglePopMenu} />
          <PlaylistEditMenu playlist={playlist} />
        </>
      )}
      <BsThreeDots />
    </div>
  );
}
