import actions from './actions';
const initState = { usersData: [], errorMessage: null, isLoading: false }; //idToken: null,

export default function userReducer(state = initState, action) {
    switch (action.type) {
        case actions.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }
        case actions.GET_USER_DATA:
            return { ...state, usersData: action.payload, isLoading: false };
        case actions.GET_Error:
            return { ...state, errorMessage: action.payload, isLoading: false }
        default:
            return state;
    }
}
