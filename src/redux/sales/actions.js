import axios from 'axios';

import { ROOT_URL } from '../keys';


const actions = {
  GET_SALES: 'GET_SALES',
  GET_SALES_Error: 'GET_SALES_Error',

  getSales: () => (dispatch) => {
    try {
      axios
        .get(`${ROOT_URL}/api/salesMen`)
        .then((res) => {
          dispatch({ type: actions.GET_SALES, payload: res?.data });
        })
        .catch((err) => {
          dispatch({ type: actions.GET_SALES_Error, payload: err?.response?.data?.error || 'Service Unavailable' });
        });
    } catch (err) {
      console.log('error_catched', err);
    }
  },
};
export default actions;
