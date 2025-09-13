import { useQuery } from "@tanstack/react-query";
import { fetchAlbums, fetchPlaylists } from "../../api/api";
import { useArtist } from "../../context/ArtistContext";
import "./style/home.css";
import { Link } from "react-router";

export default function Home() {
  const { artists } = useArtist();
  const { data: playlists } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => fetchPlaylists({ page: 1, limit: 4 }),
  });
  const { data: albums } = useQuery({
    queryKey: ["albums"],
    queryFn: () => fetchAlbums({ page: 1, limit: 4 }),
  });

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Jamify</h1>
        <p>Your music, your way 🎵</p>
      </section>

      {/* Featured Playlists */}
      <section className="section">
        <h2>Featured Playlists</h2>
        <div className="card-grid">
          {playlists &&
            playlists.map((playlist) => (
              <Link
                to={`/playlists/${playlist.id}`}
                key={playlist.id}
                className="card"
              >
                {playlist.name}
              </Link>
            ))}
        </div>
      </section>

      {/* Trending Tracks */}
      <section className="section">
        <h2>Trending Now</h2>
        <div className="track-list">
          {artists.slice(0, 5).map((artist) => (
            <Link to={`/artists/${artist.id}`} key={artist.id}>
              {artist.name} — Sample Track
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
