import {
    REGISTER_USER_SUCCESS,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
    REGISTER_USER_ERROR, CLEAR_USER_ERRORS
} from './action-type';
import axios from "../../axios-api";
import {push} from "connected-react-router";
// import {NotificationManager} from "react-notifications";

const registerUserSuccess = user => {
    return {type: REGISTER_USER_SUCCESS, user};
};
const registerUserError = (error) => {
    return {type: REGISTER_USER_ERROR, error};
};

export const registerUser = userData => {
    // console.log(userData);
    return dispatch => {
        return axios.post("/users", userData).then(
            response => {
                dispatch(registerUserSuccess(response.data));
                dispatch(push("/tutorial"));
            },
            error => {
                if (error.response && error.response.data) {
                    dispatch(registerUserError(error.response.data));
                } else {
                    dispatch(registerUserError({global: "No internet connection"}));
                }
            }
        )
    }
};

const loginUserSuccess = (user) => {
    return {type: LOGIN_USER_SUCCESS, user};
};
const loginUserError = (error) => {
    return {type: LOGIN_USER_ERROR, error};
};

export const loginUser = userData => {
    return dispatch => {
        return axios.post('/users/sessions', userData).then(
            response => {
                dispatch(loginUserSuccess(response.data));
                dispatch(push('/'));
            },
            error => {
                if (error.response && error.response.data) {
                    dispatch(loginUserError(error.response.data));
                } else {
                    dispatch(loginUserError({global: "No internet connection"}));
                }
            }
        );
    };
};

export const logoutUser = () => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const headers = {Token: token};

        return axios.delete('/users/sessions', {headers}).then(
            response => {
                dispatch({type: LOGOUT_USER});
                dispatch(push('/login'));
            }
        );
    }
};

export const clearUserErrors = () => {
    return (dispatch) => {
        dispatch({type: CLEAR_USER_ERRORS});
    }
};
