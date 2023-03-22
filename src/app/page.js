import SpotifyPlayer from "@/components/SpotifyPlayer";
import SubscribeForm from "@/components/SubscribeForm";

export default function Home() {
    const playlists = [
        { name: "Wavy", id: "5S1MaZCjHZiB0qJLfZKBWe" },
        { name: "Afro Flavor", id: "28YEwQ4n80JMvvpftFYj7O" },
        { name: "Move", id: "64jRsTddnJDdp9JojqWH3e" },
    ];

  return (
    <main>
        <div className="spotify-theme">
            <div>
                <h1>Subscribe to PangoNoti</h1>
                <SubscribeForm />
            </div>
            <h1>Spotify Playlists</h1>
            <div className="playlist-container">
                {playlists.map((playlist) => (
                    <div key={playlist.id} className="playlist">
                        <h2>{playlist.name}</h2>
                        <SpotifyPlayer playlistId={playlist.id} />
                    </div>
                ))}
            </div>
        </div>
    </main>
  )
}
