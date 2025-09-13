import { FaPlay } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";
import PlaylistEditMenu from "./PlaylistEditMenu";

export default function PlaylistPageSettings({ playlist }) {
  const { togglePopMenu } = useTheme();

  return (
    <div className="playlistPageSettings">
      <FaPlay className="playPauseBtn" />
      <FaShuffle />
      <FiEdit onClick={togglePopMenu} />
      <BsThreeDots />
      <PlaylistEditMenu playlist={playlist} />
    </div>
  );
}
