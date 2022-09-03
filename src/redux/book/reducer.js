import actions from './actions';

const initState = { books: [], errosMessage: null, isLoading: false };

export default function bookReducer(state = initState, action) {
  switch (action.type) {
    case actions.SET_BOOK_LOADING:
      return { ...state, isLoading: action.payload, }

    case actions.GET_BOOK_DATA: {
      return { ...state, books: action.payload, isLoading: false };
    }
    case actions.GET_BOOK_Error: {
      return { ...state, errosMessage: action.payload, isLoading: false };
    }

    default:
      return state;
  }
}
