import { REGISTER_USER_SUCCESS, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from './action-type';
import axios from "../../axios-api";
import {push} from "connected-react-router";
import {NotificationManager} from "react-notifications";

const registerUserSuccess = () => {
    return {type: REGISTER_USER_SUCCESS};
};

export const registerUser = userData => {
    console.log(userData);
    return dispatch => {
        axios.post("/users", userData).then(
            response => {
                dispatch(registerUserSuccess());
                dispatch(push("/"));
            },
            // error => {
            //     if (error.response && error.response.data) {
            //         dispatch(registerUserError(error.response.data));
            //     } else {
            //         dispatch(registerUserError({global: "No internet connection"}));
            //     }
            // }
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
    console.log(userData.phone);
    return dispatch => {
        axios.post("/users/sessions", userData).then(
            response => {
                dispatch(loginUserSuccess(response.data));
                dispatch(push("/"));
            },
            error => {
                if (error.response && error.response.data) {
                    dispatch(loginUserError(error.response.data));
                } else {
                    dispatch(loginUserError({global: "No internet connection"}));
                }
            }
        )
    }
};