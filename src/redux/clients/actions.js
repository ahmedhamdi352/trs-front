import axios from 'axios';
import toaster from '../toaster/actions';

import { ROOT_URL } from '../keys';

const actions = {
    GET_CLIENTS_DATA: 'GET_CLIENTS_DATA',
    GET_CLIENTS_Error: 'GET_CLIENTS_Error',
    SET_CLIENT_LOADING: 'SET_CLIENT_LOADING',
    GET_CLIENT_SEARCH: 'GET_CLIENT_SEARCH',
    SAVE_CLIENT: 'SAVE_CLIENT',
    CREATE_CLIENTS_SUCCEFULLY: 'CREATE_CLIENTS_SUCCEFULLY',
    CLEAR_SEARCH_CLIENTS: 'CLEAR_SEARCH_CLIENTS',

    getClients: () => (dispatch) => {
        dispatch({ type: actions.SET_CLIENT_LOADING, payload: true })
        try {
            axios
                .get(`${ROOT_URL}/api/client`)
                .then((res) => {
                    dispatch({ type: actions.GET_CLIENTS_DATA, payload: res?.data });
                })
                .catch((err) => {
                    dispatch({ type: actions.GET_CLIENTS_Error, payload: err?.response?.data?.error || 'Service Unavailable' });
                });
        } catch (err) {
            console.log('error_catched', err);
        }
    },
    flushClients: () => (dispatch) => {
        dispatch({ type: actions.GET_CLIENTS_DATA, payload: [] })
        dispatch({ type: actions.GET_CLIENTS_Error, payload: null });
    },

    allClientSearch: (phone) => (dispatch) => {
        dispatch({ type: actions.SET_CLIENT_LOADING, payload: true })
        try {
            axios
                .post(`${ROOT_URL}/api/client/search/${phone}`)
                .then((res) => {
                    dispatch({ type: actions.GET_CLIENTS_DATA, payload: [res?.data] });
                })
                .catch((err) => {
                    console.log(err)
                    dispatch(toaster.triggerError('User Not Found'));
                    dispatch({ type: actions.GET_CLIENTS_Error, payload: err?.response?.data?.message || 'Service Unavailable' });
                });
        } catch (err) {
            console.log('error_catched', err);
        }
    },

    clientSearch: (phone) => (dispatch) => {
        dispatch({ type: actions.SET_CLIENT_LOADING, payload: true })
        try {
            axios
                .post(`${ROOT_URL}/api/client/search/${phone}`)
                .then((res) => {
                    dispatch({ type: actions.GET_CLIENT_SEARCH, payload: res?.data });
                })
                .catch((err) => {
                    console.log(err?.response)
                    dispatch(toaster.triggerError('User Not Found'));
                    dispatch({ type: actions.GET_CLIENTS_Error, payload: err?.response?.data?.message || 'Service Unavailable' });
                });
        } catch (err) {
            console.log('error_catched', err);
        }
    },
    clearSearchClients: () => (dispatch) => {
        dispatch({ type: actions.CLEAR_SEARCH_CLIENTS, payload: [] });
    },
    saveClient: (data) => (dispatch, getState) => {
        dispatch({ type: actions.SET_CLIENT_LOADING, payload: true })

        try {
            axios
                .post(`${ROOT_URL}/api/client`, data)
                .then((res) => {
                    dispatch({ type: actions.GET_CLIENT_SEARCH, payload: res?.data })
                    dispatch(toaster.triggerSuccess('Client created'));
                })
                .catch((err) => {
                    console.log(err?.response?.data)
                    dispatch(toaster.triggerError(err?.response?.data?.error?.message));
                    dispatch({ type: actions.GET_CLIENTS_Error, payload: err?.response?.data?.message || 'Service Unavailable' });
                });
        } catch (err) {
            console.log('error_catched', err);
        }
    },
};

export default actions;
