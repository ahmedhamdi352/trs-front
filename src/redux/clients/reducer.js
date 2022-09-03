import actions from './actions';
const initState = {
    clientsData: [], searchClients: [],
    savedClients: [],
    errorMessage: null, isLoading: false
}; //idToken: null,

export default function clientReducer(state = initState, action) {
    switch (action.type) {
        case actions.SET_CLIENT_LOADING:
            return { ...state, isLoading: action.payload }
        case actions.GET_CLIENTS_DATA:
            return { ...state, clientsData: action.payload, isLoading: false };
        case actions.GET_CLIENTS_Error:
            return { ...state, errorMessage: action.payload, isLoading: false }
        case actions.GET_CLIENT_SEARCH:
            return { ...state, isLoading: false, searchClients: [...state.searchClients, action.payload] }
        case actions.SAVE_CLIENT:
            return { ...state, isLoading: false, savedClients: [...state.savedClients, action.payload] }
        case actions.CLEAR_SEARCH_CLIENTS: {
            return { ...state, searchClients: [] }
        }
        default:
            return state;
    }
}
