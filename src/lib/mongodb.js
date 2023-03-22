import mongoose from 'mongoose';

export async function connectToDatabase() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    const uri = process.env.MONGODB_URI;

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(_ => 'Connected to Mongo');
}