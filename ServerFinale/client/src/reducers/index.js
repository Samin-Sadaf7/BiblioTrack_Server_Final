import { combineReducers } from 'redux';

import auth from './auth';
import books from './books';
import video from './video';

export const reducers = combineReducers({ books, auth, video });