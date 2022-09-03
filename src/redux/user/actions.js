import axios from 'axios';
import { ROOT_URL } from '../keys';

const actions = {
    GET_USER_DATA: 'GET_USER_DATA',
    GET_Error: 'GET_Error',
    SET_IS_LOADING: 'SET_IS_LOADING',

    getUsers: (data) => (dispatch) => {
        dispatch({ type: actions.SET_IS_LOADING, payload: true })
        try {
            axios
                .get(`${ROOT_URL}/api/user/${data}`)
                .then((res) => {
                    dispatch({ type: actions.GET_USER_DATA, payload: res?.data });
                })
                .catch((err) => {
                    dispatch({ type: actions.GET_Error, payload: err?.response?.data?.error || 'Service Unavailable' });
                });
        } catch (err) {
            console.log('error_catched', err);
        }
    },
    flushUsers: () => (dispatch) => {
        dispatch({ type: actions.GET_USER_DATA, payload: [] })
        dispatch({ type: actions.GET_Error, payload: null });
    },
    getSaleMen: () => (dispatch) => {
        dispatch({ type: actions.SET_IS_LOADING, payload: true })
        try {
            axios
                .get(`${ROOT_URL}/api/salesMen`)
                .then((res) => {
                    dispatch({ type: actions.GET_USER_DATA, payload: res?.data });
                })
                .catch((err) => {
                    dispatch({ type: actions.GET_Error, payload: err?.response?.data?.error || 'Service Unavailable' });
                });
        } catch (err) {
            console.log('error_catched', err);
        }
    },
    deleteUser: (userId, model) => (dispatch) => {
        dispatch({ type: actions.SET_IS_LOADING, payload: true })
        try {
            axios
                .delete(`${ROOT_URL}/api/user/delete/${userId}`)
                .then((res) => {
                    setTimeout(() => {
                        dispatch(actions.getUsers(model));
                    }, 1500);
                })
                .catch((err) => {
                    dispatch({ type: actions.GET_Error, payload: err?.response?.data?.error || 'Service Unavailable' });
                });
        } catch (err) {
            console.log('error_catched', err);
        }
    },
    deleteSaleMan: (userId) => (dispatch) => {
        dispatch({ type: actions.SET_IS_LOADING, payload: true })
        try {
            axios
                .delete(`${ROOT_URL}/api/salesMen/delete/${userId}`)
                .then((res) => {
                    setTimeout(() => {
                        dispatch(actions.getSaleMen());
                    }, 1500);
                })
                .catch((err) => {
                    dispatch({ type: actions.GET_Error, payload: err?.response?.data?.error || 'Service Unavailable' });
                });
        } catch (err) {
            console.log('error_catched', err);
        }
    },
};
export default actions;
