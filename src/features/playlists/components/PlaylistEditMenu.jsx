import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PopMenu from "../../../components/PopMenu";
import { useTheme } from "../../../context/ThemeContext";
import { updatePlaylist } from "../../../api/api";
import "../style/playlistEditMenu.css";

export default function PlaylistEditMenu({ playlist }) {
  const { popMenu, togglePopMenu } = useTheme();
  const queryClient = useQueryClient();
  const [image, setImage] = useState(playlist.image_url);

  const mutation = useMutation({
    mutationFn: (v) => updatePlaylist(playlist.id, v),
    onSuccess: () => {
      queryClient.invalidateQueries(["playlists", "playlist", playlist.id]);
      queryClient.refetchQueries(["playlists", "playlist", playlist.id]);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (formData) => {
    const name = formData.get("name");
    const description = formData.get("description");
    const is_public = formData.get("is_public");

    mutation.mutate({
      name,
      description,
      is_public,
      image_url: image,
    });
    togglePopMenu();
  };

  return (
    <PopMenu open={popMenu} onClose={togglePopMenu} id="playlistEditMenu">
      <h1>Editing: {playlist.name}</h1>
      <div className="playlistEditMenuContents">
        <img
          src={image}
          alt="Playlist"
          style={{ maxWidth: 120, borderRadius: 8, marginBottom: 8 }}
        />
        <form action={handleSubmit}>
          <input
            type="text"
            name="name"
            defaultValue={playlist.name}
            placeholder="Playlist name..."
            required
          />
          <input
            type="text"
            name="description"
            defaultValue={playlist.description}
            placeholder="Playlist description..."
          />
          <select name="is_public" defaultValue={playlist.is_public}>
            <option value={false}>Private</option>
            <option value={true}>Public</option>
          </select>

          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button>Confirm</button>
        </form>
      </div>
    </PopMenu>
  );
}
