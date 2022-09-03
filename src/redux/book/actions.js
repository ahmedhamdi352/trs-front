import axios from 'axios';
import toaster from '../toaster/actions';

import { ROOT_URL } from '../keys';
const actions = {
  GET_BOOK_DATA: 'GET_BOOK_DATA',
  GET_BOOK_Error: 'GET_BOOK_Error',
  SET_BOOK_LOADING: 'SET_BOOK_LOADING',

  getBooks: (eventId) => (dispatch) => {
    dispatch({ type: actions.SET_BOOK_LOADING, payload: true })
    try {
      axios
        .get(`${ROOT_URL}/api/book/${eventId}`)
        .then((res) => {
          dispatch({ type: actions.GET_BOOK_DATA, payload: res?.data });
        })
        .catch((err) => {
          dispatch(toaster.triggerError(err?.response?.data?.error));
          dispatch({ type: actions.GET_BOOK_Error, payload: err?.response?.data?.error || 'Service Unavailable' });
        });
    } catch (err) {
      console.log('error_catched', err);
    }
  },
  flushBooks: () => (dispatch) => {
    dispatch({ type: actions.GET_BOOK_DATA, payload: [] })
    dispatch({ type: actions.GET_BOOK_Error, payload: null });
  },
  bookSearch: (phone) => (dispatch) => {
    dispatch({ type: actions.SET_BOOK_LOADING, payload: true })
    try {
      axios
        .post(`${ROOT_URL}/api/book/search/${phone}`)
        .then((res) => {
          dispatch({ type: actions.GET_BOOK_DATA, payload: res?.data });
        })
        .catch((err) => {
          dispatch(toaster.triggerError(err?.response?.data?.error));
          dispatch({ type: actions.GET_BOOK_Error, payload: err?.response?.data?.error || 'Service Unavailable' });
        });
    } catch (err) {
      console.log('error_catched', err);
    }
  },
  createBook: (data) => (dispatch) => {
    dispatch({ type: actions.SET_BOOK_LOADING, payload: true })
    try {
      axios
        .post(`${ROOT_URL}/api/book`, data)
        .then((res) => {
          dispatch(toaster.triggerSuccess('Book Created'));
          dispatch({ type: actions.SET_BOOK_LOADING, payload: false })
        })
        .catch((err) => {
          dispatch(toaster.triggerError(err?.response?.data?.error));
          dispatch({ type: actions.GET_BOOK_Error, payload: err?.response?.data?.error || 'Service Unavailable' });
        });
    } catch (err) {
      console.log('error_catched', err);
    }
  },
  deleteBook: (bookID, eventId) => (dispatch) => {
    dispatch({ type: actions.SET_BOOK_LOADING, payload: true })
    try {
      axios
        .delete(`${ROOT_URL}/api/book/delete/${bookID}/${eventId}`)
        .then((res) => {
          dispatch(toaster.triggerSuccess('Book deleted'));
          setTimeout(() => {
            dispatch(actions.getBooks(eventId));
          }, 1500);
        })
        .catch((err) => {
          dispatch(toaster.triggerError(err?.response?.data?.error));
          dispatch({ type: actions.GET_BOOK_Error, payload: err?.response?.data?.error || 'Service Unavailable' });
        });
    } catch (err) {
      console.log('error_catched', err);
    }
  },

};
export default actions;
