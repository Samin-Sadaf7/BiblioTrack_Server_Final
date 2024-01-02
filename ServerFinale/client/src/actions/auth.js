import * as api from '../api/index.js';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
  }
};

export const signInGoogle = (accessToken, navigate) => async (dispatch)=>{
  try{
      console.log(accessToken);
      const {data} = await api.signInGoogle(accessToken)

      dispatch({type : AUTH, data})
      navigate("/")
  }catch(err){
      console.log(err)
  }
};
