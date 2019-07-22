import { REGISTER_USER_SUCCESS } from './action-type';
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