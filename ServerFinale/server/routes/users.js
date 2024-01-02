import express from 'express';

import { deleteVideo, getVideos, signin, signinGoogle, signup, uploadVideo } from '../controllers/users.js';

import { uploadReviewVideo } from '../middlewares/media.js';
const router =  express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/signinGoogle', signinGoogle);
router.post('/uploadVideo', uploadReviewVideo.single('video'), uploadVideo);
router.get('/getVideos', getVideos);
router.delete('/deleteVideo', deleteVideo);
export default router;