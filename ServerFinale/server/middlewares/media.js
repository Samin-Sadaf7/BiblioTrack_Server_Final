import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['video/webm', 'video/mp4', 'video/ogg'];
  if (allowedTypes.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only WebM, MP4, and OGG files are allowed.'));
  }
};

const ReviewVideo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      uuidv4() + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

export const uploadReviewVideo = multer({ 
  storage: ReviewVideo, 
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 100, 
  },
});

