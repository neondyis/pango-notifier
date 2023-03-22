import styles from './page.module.css'

export default function Home() {
    const fetchPlaylist = async (playlistId) => {
        try {
            const response = await axios.get(`/api/spotify?playlistId=${playlistId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching playlist:', error);
            return null;
        }
    };

  return (
    <main>
      uhu
    </main>
  )
}
