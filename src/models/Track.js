
import mongoose from 'mongoose';

const TrackSchema = new mongoose.Schema({
    trackId: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    artists: [String],
    playlistId: String,
    externalUrl: String,
});

export default mongoose.models.Track || mongoose.model('Track', TrackSchema);