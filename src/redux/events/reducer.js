import actions from './actions';
const initState = { events: [], errorMessage: null, isLoading: false };

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case actions.SET_EVENTS_LOADING:
      return { ...state, isLoading: action.payload }
    case actions.GET_EVENTS:
      return { ...state, events: action.payload, isLoading: false }
    case actions.GET_EVENTS_Error:
      return { ...state, errorMessage: action.payload, isLoading: false }
    default:
      return state;
  }
}
