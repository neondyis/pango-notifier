import axios from 'axios';
import {connectToDatabase} from "@/lib/mongodb";
import Track from "@/models/Track";

const getToken = async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
                grant_type: 'client_credentials',
            },
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
};

const getPlaylistItems = async (token, playlistId, offset = 0) => {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                limit: 50,
                offset,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error getting playlist items:', error);
        return null;
    }
};

const getPlaylist = async (token, playlistId) => {
    let offset = 0;
    let allTracks = [];

    while (true) {
        const playlistItems = await getPlaylistItems(token, playlistId, offset);

        if (!playlistItems) {
            return null;
        }

        allTracks = allTracks.concat(playlistItems.items);

        if (playlistItems.next) {
            offset += 50;
        } else {
            break;
        }
    }

    return {
        tracks: {
            items: allTracks,
        },
    };
};

const saveTracks = async (tracks, playlistId) => {
    await connectToDatabase();
    const newTracks = [];

    for (const track of tracks) {
        const trackId = track.track.id;
        const existingTrack = await Track.findOne({ trackId });

        if (!existingTrack) {
            const trackToSave = new Track({
                trackId,
                name: track.track.name,
                artists: track.track.artists.map((artist) => artist.name),
                playlistId,
                externalUrl: track.track.external_urls.spotify,
            });

            await trackToSave.save();
            newTracks.push(trackToSave);
        }
    }

    return newTracks;
};

export async function GET (req) {
    const { searchParams } = new URL(req.url);
    const playlistId = searchParams.get('playlistId');
    const token = await getToken();

    if (!token) {
        return Response.json({ error: 'Failed to get access token' }, { status: 500 });
    }

    const playlist = await getPlaylist(token, playlistId);

    if (!playlist) {
        return Response.json({ error: 'Playlist not found' }, { status: 404 });
    }
    //
    const tracks = playlist.tracks.items;
    const newTracks = await saveTracks(tracks);

    return Response.json({ newTracks }, { status: 200 });
}