import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
    CLEAR_USER_ERRORS,
    UPDATE_USER_ERROR, SAVE_TEMPORARY_USER_TO_REDUX_STORE
} from '../actions/action-type';

const initialState = {
    registerError: null,
    loginError: null,
    updateUserDataError: null,
    user: null,
    codedUser: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {...state, user: action.user, registerError: null};
        case SAVE_TEMPORARY_USER_TO_REDUX_STORE:
            return {...state, codedUser: action.userData};
        case REGISTER_USER_ERROR:
            return {...state, registerError: action.data};
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, loginError: null};
        case LOGIN_USER_ERROR:
            return {...state, loginError: action.data};
        case LOGOUT_USER:
            return {...state, user: null, loginError: null, registerError: null};
        case CLEAR_USER_ERRORS:
            return {...state, registerError: null, loginError: null};
        case UPDATE_USER_ERROR:
            return {...state, updateUserDataError: action.data};
        default:
            return state;
    }
};

export default userReducer;