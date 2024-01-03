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
          avatar_id: "7f2ff78b142449538062761366349391",
          avatar_style: "normal",
        },
        voice: {
          type: "text",
          input_text: speech,
          voice_id: "f9e7834ed916486496181a5faed9800d",
        },
      },
    ],
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
