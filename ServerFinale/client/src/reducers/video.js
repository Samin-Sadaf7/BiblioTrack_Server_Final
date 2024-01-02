import { DELETE_VIDEO, UPLOAD_VIDEO } from '../constants/actionTypes';

const initialState = {
  // Initial state for video-related data
  uploadedVideos: [], // Placeholder for uploaded videos
  // Other video-related state properties if needed
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_VIDEO:
      return {
        ...state,
        uploadedVideos: [...state.uploadedVideos, action.payload],
        // Handle other state changes related to uploading video if needed
      };
    case DELETE_VIDEO:
      return {
        ...state,
        uploadedVideos: state.uploadedVideos.filter(video => video !== action.payload),
        // Handle other state changes related to deleting video if needed
      };
    // Add additional cases for other video-related actions if required
    default:
      return state;
  }
};

export default videoReducer;
