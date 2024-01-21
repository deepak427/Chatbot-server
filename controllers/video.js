import videoIds from "../models/videoIds.js";
import { GetVideoHyegen, uploadHyegenVideo } from "./GethyegenVideo.js";

export const addVideoId = async (req, res) => {
  const { title, speech } = req.body;
  try {
    uploadHyegenVideo(title, speech);

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
    var getAllIds = await videoIds.find();
    getAllIds = getAllIds.reverse();
    var allVideosDetails = [];
    for (let i = 0; i < getAllIds.length; i++) {
      if (getAllIds[i].status === 1 ) {
        const videoInfo = await GetVideoHyegen(getAllIds[i].videoId);
        allVideosDetails.push([videoInfo.data.data, getAllIds[i].title, getAllIds[i].videoId]);
      } else if (getAllIds[i].status === 0) {
        allVideosDetails.push([
          {
            status: "",
            video_url: "",
            thumbnail_url: "",
          },
          getAllIds[i].title,
        ]);
      } else {
      }
    }
    res.status(200).json(allVideosDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const hideVideo = async (req, res) => {
  const { videoId } = req.body;
  try {
    const updatedVideo = await videoIds.findOneAndUpdate(
      { videoId: videoId },
      { $set: { status: -1 } },
      { new: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({ error: "Video not found" });
    }

    return res.json({message: "Successful"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
