import * as api from '../api/index';
import { DELETE_VIDEO, UPLOAD_VIDEO } from '../constants/actionTypes';

export const uploadVideo = (video) => async (dispatch) => {
    try {
      console.log(video);
      const { data } = await api.uploadVideo(video);
      console.log(data);
      dispatch({ type: UPLOAD_VIDEO, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteVideo = (videoId) => async (dispatch) => {
    try {
      await api.deleteVideo(videoId);
      dispatch({ type: DELETE_VIDEO, payload: videoId });
    } catch (error) {
        console.log(error);
    }
};