import videoIds from "../models/videoIds.js";
import { GetVideoHyegen, uploadHyegenVideo } from "./GethyegenVideo.js";

export const addVideoId = async (req, res) => {
  const {title, speech} = req.body;
  try {
    const uploadResponse = await uploadHyegenVideo(speech);
    const existingVideo = await videoIds.findOne({ videoId: uploadResponse.data.data.video_id });
    if (existingVideo) {
      return res.status(404).json({ message: "Video already Exist." });
    }

    const newId = await videoIds.create({
      videoId: uploadResponse.data.data.video_id,
      title
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
      allVideosDetails.push([videoInfo.data.data, getAllIds[i].title]);
    }
    res.status(200).json(allVideosDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

