// import actions from "./actions";

import actions from "./actions";

const initState = { successMessage: '', errorMessage: '' };

export default function toasterReducer(state = initState, action) {
  switch (action.type) {
    case actions.SUCCESS_TOASTER:
      return { ...state, successMessage: action.paylod }
    case actions.ERROR_TOASTER:
      return { ...state, errorMessage: actions.paylod }
    default:
      return state;
  }
}
