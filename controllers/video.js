import videoIds from "../models/videoIds.js";
import { GetVideoHyegen } from "./GethyegenVideo.js";

export const addVideoId = async (req, res) => {
  const { videoId } = req.body;
  try {
    const existingVideo = await videoIds.findOne({ videoId });
    if (existingVideo) {
      return res.status(404).json({ message: "Video already Exist." });
    }

    const newId = await videoIds.create({
      videoId,
    });

    res.status(200).json({ result: newId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVideoIds = async (req, res) => {
  try {
    const getAllIds = await videoIds.find();
    var allVideosDetails = [];
    for (let i = 0; i < getAllIds.length; i++) {
      const videoInfo = await GetVideoHyegen(getAllIds[i].videoId);
      allVideosDetails.push(videoInfo.data.data);
    }
    res.status(200).json(allVideosDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
