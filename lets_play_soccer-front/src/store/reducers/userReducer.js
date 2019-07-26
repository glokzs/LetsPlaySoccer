import { REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, LOGOUT_USER } from '../actions/action-type';

const initialState = {
    registerError: null,
    loginError: null,
    user: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {...state, registerError: null};
        case REGISTER_USER_ERROR:
            return {...state, registerError: action.error};
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, loginError: null};
        case LOGIN_USER_ERROR:
            return {...state, loginError: action.error};
        case LOGOUT_USER:
            return {...state, user: null};
        default:
            return state;
    };
};

export default userReducer;