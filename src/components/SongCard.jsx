import { useSong } from "../context/SongContext";
import { getMenuPosition, secondsToMMSS } from "../utils/utils";
import "./style/songCard.css";
import SongMenu from "./songMenu/SongMenu";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMusicalNoteSharp } from "react-icons/io5";
import { RxDotsHorizontal } from "react-icons/rx";

export default function SongCard({ song, showListens = false }) {
  const {
    currentlyInteracting,
    setCurrentlyInteracting,
    hoveringSong,
    setHoveringSong,
  } = useSong();

  const handleRightClick = (event) => {
    const { x, y } = getMenuPosition(event.clientX, event.clientY, 180, 100);

    event.preventDefault();
    setCurrentlyInteracting({
      song,
      x: x,
      y: y,
    });
  };

  const isInteracting =
    currentlyInteracting && currentlyInteracting.song.id === song.id;

  return (
    <>
      <div
        className={"songCard" + (isInteracting ? " active" : "")}
        onAuxClick={handleRightClick}
        onMouseEnter={() => setHoveringSong(song)}
        onMouseLeave={() => setHoveringSong(null)}
      >
        <div className="songCardHeader">
          <ActionButton song={song} />
          <img src={song.thumbnail_url} />
          <h3>{song.title}</h3>
        </div>
        {showListens && <p>{song.listens}</p>}
        <div className="songCardControls">
          <p className="songCardDuration">{secondsToMMSS(song.duration)}</p>
          <RxDotsHorizontal
            className="songCardEdit"
            onClick={handleRightClick}
          />
        </div>
      </div>
      {isInteracting && (
        <SongMenu x={currentlyInteracting.x} y={currentlyInteracting.y} />
      )}
    </>
  );
}

function ActionButton({ song }) {
  const { songPlaying, startPlaying, stopPlaying, hoveringSong } = useSong();

  const showPause = songPlaying && songPlaying.id === song.id;
  const showPlay = hoveringSong && hoveringSong.id === song.id;

  return (
    <>
      {showPause && <FaPause onClick={() => stopPlaying(song)} />}
      {!showPause && showPlay && <FaPlay onClick={() => startPlaying(song)} />}
      {!showPause && !showPlay && <IoMusicalNoteSharp />}
    </>
  );
}
