import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("videoIds", videoSchema);
