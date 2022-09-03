import actions from './actions';

const initState = { sales: null, errosMessage: null };

export default function settingReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_SALES: {
      return { ...state, sales: action.payload };
    }
    case actions.GET_SALES_Error: {
      return { ...state, errosMessage: action.payload };
    }

    default:
      return state;
  }
}
