import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  videoId: { type: String, default: ""},
  title: { type: String, required: true },
  speech: { type: String, required: true },
  status: { type: Number, default: 1},
  created_at: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("videoIds", videoSchema);
