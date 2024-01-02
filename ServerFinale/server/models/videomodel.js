import mongoose from 'mongoose';

const videoSchema = mongoose.Schema({
    videoFile: String,
    userId: String
});

export default mongoose.model("Video", videoSchema);    