import axios from "axios";
import dotenv from "dotenv";
import { runUploading } from "./automatedUploading.js";

dotenv.config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

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

export const uploadHyegenVideo = async (title, speech) => {
  try {
    await runUploading(title, speech);
  } catch (error) {
    console.log(error.message);
  }
};
