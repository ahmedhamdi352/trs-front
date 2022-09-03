import axios from 'axios';

import { ROOT_URL } from '../keys';
import toaster from '../toaster/actions';
import { sortBy } from 'lodash';
import moment from 'moment';

const actions = {
  GET_EVENTS: 'GET_EVENTS',
  GET_EVENTS_Error: 'GET_EVENTS_Error',
  SET_EVENTS_LOADING: 'SET_EVENTS_LOADING',

  getEvents: () => (dispatch) => {
    dispatch({ type: actions.SET_EVENTS_LOADING, payload: true })
    try {
      axios
        .get(`${ROOT_URL}/api/events`)
        .then((res) => {
          dispatch({ type: actions.GET_EVENTS, payload: sortBy(res?.data, (item) => moment(item.startDate)) });
        })
        .catch((err) => {
          dispatch({ type: actions.GET_EVENTS_Error, payload: err?.response?.data?.error || 'Service Unavailable' });
        });
    } catch (err) {
      console.log('error_catched', err);
    }
  },
  flushEvents: () => (dispatch) => {
    dispatch({ type: actions.GET_EVENTS, payload: [] })
    dispatch({ type: actions.GET_EVENTS_Error, payload: null });
  },

  createEvent: (event) => (dispatch) => {
    dispatch({ type: actions.SET_EVENTS_LOADING, payload: true })
    axios
      .post(`${ROOT_URL}/api/events`, event)
      .then((res) => {
        dispatch({ type: actions.SET_EVENTS_LOADING, payload: false })
        dispatch(toaster.triggerSuccess('Event created'));
      })
      .catch((err) => {
        dispatch({ type: actions.SET_EVENTS_LOADING, payload: false })
        let errorMsg = err.response?.data?.error;
        dispatch(toaster.triggerError(errorMsg));
      });
  },
  seachEvent: (event) => (dispatch) => {
    dispatch({ type: actions.SET_EVENTS_LOADING, payload: true })
    axios
      .post(`${ROOT_URL}/api/events/search`, event)
      .then((res) => {
        dispatch({ type: actions.GET_EVENTS, payload: sortBy(res?.data, (item) => moment(item.startDate)) });
        dispatch({ type: actions.SET_EVENTS_LOADING, payload: false })
      })
      .catch((err) => {
        dispatch({ type: actions.SET_EVENTS_LOADING, payload: false })
        let errorMsg = err.response?.data?.error;
        dispatch(toaster.triggerError(errorMsg));
      });
  },

  updateEvent: (eventId, values) => (dispatch) => {
    dispatch({ type: actions.SET_EVENTS_LOADING, payload: true })
    axios
      .put(`${ROOT_URL}/api/events/${eventId}`, values)
      .then((res) => {
        dispatch(toaster.triggerSuccess('Event updated'));
        setTimeout(() => {
          dispatch(actions.getEvents());
        }, 1500);
      })
      // dispatch({ type: actions.UPDATE_USER_SUCCESS, payload: res.data });
      .catch((err) => {
        let errorMsg = err.response?.data?.message;
        let errorDetails = err.response?.data?.error?.details || [];
        dispatch(toaster.triggerError(errorMsg, errorDetails));
        dispatch({ type: actions.GET_EVENTS_Error, payload: err.response?.data });
      });
  },

  deleteEvent: (eventId) => (dispatch) => {
    dispatch({ type: actions.SET_EVENTS_LOADING, payload: true })
    try {
      axios
        .delete(`${ROOT_URL}/api/events/delete/${eventId}`)
        .then((res) => {
          dispatch(toaster.triggerSuccess('Event deleted'));
          setTimeout(() => {
            dispatch(actions.getEvents());
          }, 1500);
        })
        .catch((err) => {
          let errorMsg = err.response?.data?.error;
          let errorDetails = err.response?.data?.error?.details || [];
          dispatch(toaster.triggerError(errorMsg, errorDetails));
          dispatch({ type: actions.GET_EVENTS_Error, payload: err?.response?.data?.error || 'Service Unavailable' });
        });
    } catch (err) {
      console.log('error_catched', err);
    }
  },
};
export default actions;
