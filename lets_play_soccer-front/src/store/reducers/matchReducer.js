import {
    GET_MATCHES_SUCCESS,
    GET_MATCHES_ERROR,
    GET_MY_MATCHES_SUCCESS,
    GET_MY_MATCHES_ERROR
} from '../actions/action-type';

const initialState = {
    matches: [],
    matchesError: null,
    myMatches: [],
    myMatchesError: null
};

const matchReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MATCHES_SUCCESS:
            return {...state, matches: action.data, matchesError: null};
        case GET_MATCHES_ERROR:
            return {...state, matchesError: action.error, matches: []};
        case GET_MY_MATCHES_SUCCESS:
            return {...state, myMatches: action.data, myMatchesError: null};
        case GET_MY_MATCHES_ERROR:
            return {...state, myMatchesError: action.error, myMatches: []};
        default:
            return state;
    }
};

export default matchReducer;