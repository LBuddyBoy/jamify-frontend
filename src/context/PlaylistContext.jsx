import { useState } from "react";
import { createContext, useContext, useRef } from "react";

const PlaylistContext = createContext();

export function PlaylistProvider({ children }) {
  const playlistMenuRef = useRef();
  const [search, setSearch] = useState();

  const exports = {
    playlistMenuRef,
    search,
    setSearch
  };

  return (
    <PlaylistContext.Provider value={exports}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  const context = useContext(PlaylistContext);

  if (!context)
    throw new Error("usePlaylist must be used within PlaylistContext");

  return context;
}
