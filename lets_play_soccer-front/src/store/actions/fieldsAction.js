import {GET_FIELDS_ERROR, GET_FIELDS_SUCCESS} from "./action-type";
import axios from "../../axios-api";

const getFieldsSuccess = data => {
    return {type: GET_FIELDS_SUCCESS, data};
};
const getFieldsError = (error) => {
    return {type: GET_FIELDS_ERROR, error};
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
