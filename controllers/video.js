import videoIds from "../models/videoIds.js";
import { GetVideoHyegen, uploadHyegenVideo } from "./GethyegenVideo.js";

export const addVideoId = async (req, res) => {
  const { title, speech } = req.body;
  try {
    uploadHyegenVideo();

    const newId = await videoIds.create({
      title,
      speech,
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
      if (getAllIds[i].status === 1) {
        const videoInfo = await GetVideoHyegen(getAllIds[i].videoId);
        allVideosDetails.push([
          videoInfo.data.data,
          getAllIds[i].title,
        ]);
      } else {
        allVideosDetails.push([
          {
            status: "",
            video_url: "",
            thumbnail_url: ""
          },
          getAllIds[i].title,
        ]);
      }
    }
    res.status(200).json(allVideosDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
