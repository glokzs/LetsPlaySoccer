import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
    CLEAR_USER_ERRORS,
    UPDATE_USER_ERROR
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
        case 'TEST':
            return {...state, codedUser: action.userData};
        case REGISTER_USER_ERROR:
            return {...state, registerError: action.error};
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, loginError: null};
        case LOGIN_USER_ERROR:
            return {...state, loginError: action.error};
        case LOGOUT_USER:
            return {...state, user: null, loginError: null, registerError: null};
        case CLEAR_USER_ERRORS:
            return {...state, registerError: null, loginError: null};
        case UPDATE_USER_ERROR:
            return {...state, updateUserDataError: action.error};
        default:
            return state;
    }
};

export default userReducer;