import axios from "../../axios-api";
import {push} from "connected-react-router";
import {NotificationManager} from "react-notifications";
import {
    REGISTER_USER_SUCCESS,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
    REGISTER_USER_ERROR,
    CLEAR_USER_ERRORS,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR, SAVE_TEMPORARY_USER_TO_REDUX_STORE
} from './action-type';


export const registerUser = (code, userData) => {
    return dispatch => {
        return axios.post("/users/register/" + code, userData).then(
            response => {
                const user = response.data;
                dispatch({type: REGISTER_USER_SUCCESS, user});
                dispatch(push("/my/tutorial"));
            },
            error => {
                if (error.response && error.response.data) {
                    const data = error.response.data;
                    dispatch({type: REGISTER_USER_ERROR, data});
                } else {
                    const data = {global: "Что-то пошло не так"};
                    dispatch({type: REGISTER_USER_ERROR, data});
                }
            }
        )
    }
};

export const confirmedPhoneNumber = userData => {
    return dispatch => {
        return axios.post("code", userData).then(response => {
                dispatch({type: SAVE_TEMPORARY_USER_TO_REDUX_STORE, userData});
                dispatch(push("/confirm"));
            }).catch(error => {
            if (error.response && error.response.data) {
                const data = error.response.data;
                dispatch({type: REGISTER_USER_ERROR, data});
            } else {
                const data = {global: "Что-то пошло не так"};
                dispatch({type: REGISTER_USER_ERROR, data});
            }
        })
    }
};

export const loginUser = userData => {
    return dispatch => {
        return axios.post('/users/sessions', userData).then(
            response => {
                const user = response.data;
                dispatch({type: LOGIN_USER_SUCCESS, user});
                dispatch(push('/my/matches'));
            },
            error => {
                if (error.response && error.response.data) {
                    const data = error.response.data;
                    dispatch({type: LOGIN_USER_ERROR, data});
                } else {
                    const data = {global: "Что-то пошло не так"};
                    dispatch({type: LOGIN_USER_ERROR, data});
                }
            }
        );
    };
};

export const logoutUser = () => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const headers = {Authorization: token};

        return axios.delete('/users/sessions', {headers}).then(
            response => {
                dispatch({type: LOGOUT_USER});
                dispatch(push('/login'));
                localStorage.removeItem('user');
                NotificationManager.success("Logged out!");
            }
        );
    }
};

export const clearUserErrors = () => {
    return (dispatch) => {
        dispatch({type: CLEAR_USER_ERRORS});
    }
};

export const updateUser = (updateDataUser) => {
    return dispatch => {
        return axios.put('/users', updateDataUser).then(
            response => {
                const user = response.data;
                dispatch({type: UPDATE_USER_SUCCESS, user});
            },
            error => {
                if (error.response && error.response.data) {
                    const data = error.response.data;
                    dispatch({type: UPDATE_USER_ERROR, data});
                } else {
                    const data = {global: "Что-то пошло не так"};
                    dispatch({type: UPDATE_USER_ERROR, data});
                }
            }
        );
    };
};