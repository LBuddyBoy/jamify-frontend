import { useState } from "react";
import { useSong } from "../../context/SongContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PopMenu from "../PopMenu";
import { addSongToPlaylist } from "../../api/api";

export default function PlaylistItem({ playlist }) {
  const { currentlyInteracting } = useSong();
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const queryClient = useQueryClient();

  const addToPlaylist = async (playlistId, songId) => {
    const response = await addSongToPlaylist(playlistId, songId);

    if (response.error) setError(response.error);

    return response.data;
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["playlist", playlist.id, "playlists"],
    });
    queryClient.refetchQueries({
      queryKey: ["playlist", playlist.id, "playlists"],
    });
    setAdded(true);
  };

  const mutation = useMutation({
    mutationFn: () => addToPlaylist(playlist.id, currentlyInteracting.song.id),
    onSuccess: handleSuccess,
  });

  const handleClose = () => {
    setError(null);
    mutation.reset();
  };

  return (
    <>
      <li onClick={mutation.mutate}>
        {playlist.name} {added && " ✓"}
      </li>
      <PopMenu open={!!error} onClose={handleClose}>
        <h3>Already added</h3>
        {error}
      </PopMenu>
    </>
  );
}
