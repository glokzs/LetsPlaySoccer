import {
    GET_FIELDS_SUCCESS,
    GET_FIELDS_ERROR, IS_FIELD_LIST_EMPTY
} from '../actions/action-type';

const initialState = {
    fields: [],
    fieldsError: null,
    isEmpty: false
};

const fieldsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FIELDS_SUCCESS:
            return {...state, fields: [...state.fields, ...action.data], fieldsError: null};
        case GET_FIELDS_ERROR:
            return {...state, fieldsError: action.error, fields: []};
        case IS_FIELD_LIST_EMPTY:
            return {...state, isEmpty: true};
        default:
            return state;
    }
};

export default fieldsReducer;