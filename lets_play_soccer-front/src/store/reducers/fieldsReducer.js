import {
    GET_FIELDS_SUCCESS,
    GET_FIELDS_ERROR
} from '../actions/action-type';

const initialState = {
    fields: [],
    fieldsError: null,
};

const fieldsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FIELDS_SUCCESS:
            return {...state, fields: action.data, fieldsError: null};
        case GET_FIELDS_ERROR:
            return {...state, fieldsError: action.error, fields: []};
        default:
            return state;
    }
};

export default fieldsReducer;