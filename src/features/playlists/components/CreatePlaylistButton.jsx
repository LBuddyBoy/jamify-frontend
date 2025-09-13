import { useMutation, useQueryClient } from "@tanstack/react-query";
import PopMenu from "../../../components/PopMenu";
import { useTheme } from "../../../context/ThemeContext";
import { createPlaylist } from "../../../api/api";
import { useState } from "react";

export default function CreatePlaylistButton() {
  const { popMenu, togglePopMenu } = useTheme();
  const [name, setName] = useState();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => createPlaylist(name),
    onSuccess: () => {
      queryClient.invalidateQueries(["playlists"]);
      queryClient.refetchQueries(["playlists"]);
    },
  });

  const handleSubmit = async () => {
    mutation.mutate();
    togglePopMenu();
  };

  return (
    <>
      <button className="createPlaylistBtn" onClick={togglePopMenu}>
        + Create a Playlist
      </button>
      <PopMenu open={popMenu} onClose={togglePopMenu} id="createPlaylistMenu">
        <form action={handleSubmit}>
          <h3>Choose a name...</h3>
          <input
            type="text"
            name="name"
            placeholder="Playlist name..."
            required
            onChange={(e) => setName(e.target.value)}
          />
          <button>Create Playlist</button>
        </form>
      </PopMenu>
    </>
  );
}
