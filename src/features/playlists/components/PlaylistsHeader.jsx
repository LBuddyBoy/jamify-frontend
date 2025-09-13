import { useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import { useRef } from "react";
import { usePlaylist } from "../../../context/PlaylistContext";

export default function PlaylistsHeader() {
  const formRef = useRef();
  const [showingSearch, setShowingSearch] = useState(false);
  const { setSearch } = usePlaylist();

  useClickOutside(formRef, () => {
    setShowingSearch(false);
  });

  const handleClick = () => {
    setShowingSearch((current) => !current);
  };

  return (
    <>
      <header className="playlistsHeader">
        <div className="playlistHeadingInfo">
          <h1>Playlists</h1>
          <div className="playlistsQueryWrapper">
            <button
              className={`playlistsQueryButton${
                showingSearch ? " hidden" : ""
              }`}
              onMouseEnter={handleClick}
            >
              🔍
            </button>
            <form
              className={`playlistsQuery${showingSearch ? " shown" : ""}`}
              ref={formRef}
              onMouseLeave={handleClick}
              style={{ pointerEvents: showingSearch ? "auto" : "none" }}
            >
              <input
                type="text"
                name="search"
                placeholder="Search for a playlist 🔍"
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
        <p>Click to view a playlist.</p>
      </header>
    </>
  );
}
