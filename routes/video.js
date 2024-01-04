import express from "express";

import { addVideoId, getVideoIds , hideVideo } from "../controllers/video.js"

const router = express.Router();

router.post('/uploadVideoId', addVideoId)
router.post('/deleteVideo', hideVideo)
router.get('/getAllIds', getVideoIds)

export default router