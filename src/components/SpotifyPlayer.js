export default function SpotifyPlayer({ playlistId }) {
    return (
        <iframe
            src={`https://open.spotify.com/embed/playlist/${playlistId}`}
            width="300"
            height="380"
            frameBorder={0}
            allow="encrypted-media"
        ></iframe>
    );
}