import { BUY, CREATE, DELETE, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, UPDATE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getBooks = (page) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING});
    const { data } = await api.getBooks(page);
    console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({type: END_LOADING});
  } catch (error) {
    console.log(error);
  }
};

export const addBook = (book) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING});
    const { data } = await api.addBook(book);
    dispatch({ type: CREATE, payload: data });
    dispatch({type: END_LOADING});
  } catch (error) {
    console.log(error);
  }
};

export const updateBook = (id, book) => async (dispatch) => {
  try {
    const { data } = await api.updateBook(id,book);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const buyBook = (id) => async (dispatch) => {
  try {
    const { data } = await api.buyBook(id);

    dispatch({ type: BUY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = (id) => async (dispatch) => {
  try {
    await api.deleteBook(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const getBooksBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.getBooksBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};