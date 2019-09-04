import {GET_FIELDS_ERROR, GET_FIELDS_SUCCESS, IS_FIELD_LIST_EMPTY} from "./action-type";
import axios from "../../axios-api";

const getFieldsSuccess = data => {
    return {type: GET_FIELDS_SUCCESS, data};
};
const getFieldsError = (error) => {
    return {type: GET_FIELDS_ERROR, error};
};


export const getLoadedFields = (offset) => {
    return dispatch => {
        axios.get("fields?offset=" + offset).then(response => {
            dispatch(getFieldsSuccess(response.data));
            if(response.data.length < 10) {
                dispatch({type: IS_FIELD_LIST_EMPTY});
            }
        },error => {
            if (error.response && error.response.data) {
                dispatch(getFieldsError(error.response.data));
            } else {
                dispatch(getFieldsError({global: "No internet connection"}));
            }
        })
    };
};
export const getFields = (cb) => {
    return dispatch => {
        return axios.get("/fields").then(
            response => {
                dispatch(getFieldsSuccess(response.data));
                cb();
            },
            error => {
                if (error.response && error.response.data) {
                    dispatch(getFieldsError(error.response.data));
                    cb();
                } else {
                    dispatch(getFieldsError({global: "No internet connection"}));
                    cb();
                }
            }
        )
    }
};
