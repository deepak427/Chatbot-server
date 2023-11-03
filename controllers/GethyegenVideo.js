import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API = axios.create();

const headers = {
  Accept: "application/json",
  "X-Api-Key": process.env.API_KEY,
};

API.interceptors.request.use((req) => {
  req.headers = headers;
  return req;
});

export const GetVideoHyegen = async (videoId) => {
  try {
    return API.get(
      `https://api.heygen.com/v1/video_status.get?video_id=${videoId}`
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const uploadHyegenVideo = async (speech) => {
  const requestData = {
    video_inputs: [
      {
        character: {
          type: "avatar",
          avatar_id: "8491e2f25ea0402ebb3a7a2eb94d1b3a",
          avatar_style: "normal",
        },
        voice: {
          type: "text",
          input_text: speech,
          voice_id: "ce282f0529824d2badf57a168817fc1e",
        },
      },
    ],
    test: true,
    aspect_ratio: "16:9",
  };
  try {
    return API.post(
      "https://api.heygen.com/v2/video/generate",
      requestData
    );
  } catch (error) {
    console.log(error.message);
  }
};
