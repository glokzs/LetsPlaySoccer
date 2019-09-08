import {
    GET_MATCHES_ERROR,
    GET_MATCHES_SUCCESS,
    GET_MY_MATCHES_SUCCESS,
    GET_MY_MATCHES_ERROR,
    POST_MATCH_ERROR,
    POST_MATCH_SUCCESS
} from "./action-type";
import axios from "../../axios-api";

const getMatchesSuccess = data => {
    return {type: GET_MATCHES_SUCCESS, data};
};
const getMatchesError = (error) => {
    return {type: GET_MATCHES_ERROR, error};
};


export const getMatches = (cb) => {
    console.log(cb);
    return dispatch => {
        axios.get("/matches")
            .then(response => {
                dispatch(getMatchesSuccess(response.data));
                cb();
            }, error => {
                if (error.response && error.response.data) {
                    dispatch(getMatchesError(error.response.data));
                } else {
                    dispatch(getMatchesError({global: "No internet connection"}));
                }
                cb();
            })
    };
};
export const getMyMatches = () => {
    return dispatch => {
        axios.get("/matches/mine").then(response => {
            const data = response.data;
            dispatch({type: GET_MY_MATCHES_SUCCESS, data});
        },error => {
            dispatch({type: GET_MY_MATCHES_ERROR, error})
        })
    };
};
export const postMatch = (data) => {
    return dispatch => {
        return axios.post("/matches", data).then(
            response => {
                const data = response.data;
                dispatch({type: POST_MATCH_SUCCESS, data})
            },
            error => {
                dispatch({type: POST_MATCH_ERROR, error})
            }
        )
    }
};
