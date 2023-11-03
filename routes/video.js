import express from "express";

import { addVideoId, getVideoIds  } from "../controllers/video.js"

const router = express.Router();

router.post('/uploadVideoId', addVideoId)
router.get('/getAllIds', getVideoIds)

export default router