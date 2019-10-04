import {
    GET_MATCHES_ERROR,
    GET_MATCHES_SUCCESS,
    GET_MY_MATCHES_SUCCESS,
    GET_MY_MATCHES_ERROR,
    POST_MATCH_ERROR,
    POST_MATCH_SUCCESS, GET_MATCH_SUCCESS, GET_MATCH_ERROR
} from "./action-type";
import axios from "../../axios-api";
import {push} from "connected-react-router";

const getMatchesSuccess = data => {
    return {type: GET_MATCHES_SUCCESS, data};
};
const getMatchesError = (error) => {
    return {type: GET_MATCHES_ERROR, error};
};

export const getMatchById = (id, cb) => {
    return dispatch => {
        axios.get("/matches/" + id)
            .then(response => {
                const data = response.data;
                dispatch({type: GET_MATCH_SUCCESS, data});
                if(cb) cb();
            }, error => {
                dispatch({type: GET_MATCH_ERROR, error});
                if(cb) cb();
            })
    };
};

export const getMatches = (id, cb) => {
    return dispatch => {
        axios.get("/matches", {params: {organizerId: id}})
            .then(response => {
                dispatch(getMatchesSuccess(response.data));
                if(cb) cb();
            }, error => {
                if (error.response && error.response.data) {
                    dispatch(getMatchesError(error.response.data));
                } else {
                    dispatch(getMatchesError({global: "No internet connection"}));
                }
                if(cb) cb();
            })
    };
};

export const getMyMatches = (id) => {
    return dispatch => {
        axios.get("/matches", {params: {organizerId: id, mine: true}})
            .then(response => {
                const data = response.data;
                dispatch({type: GET_MY_MATCHES_SUCCESS, data});
            }, error => {
                dispatch({type: GET_MY_MATCHES_ERROR, error})
            })
    };
};

export const postMatch = (data) => {
    return dispatch => {
        return axios.post("/matches", data).then(
            response => {
                const data = response.data;
                dispatch({type: POST_MATCH_SUCCESS, data});
                dispatch(push('/my/matches'));
            },
            error => {
                dispatch({type: POST_MATCH_ERROR, error})
            }
        )
    }
};

export const patchMatch = (data) => {
    return dispatch => {
        return axios.post("/matches", data).then(
            response => {
                //
            },
            error => {
                dispatch({type: POST_MATCH_ERROR, error})
            }
        )
    }
};

//user_match routes
export const becomeMatchMember = (data) => {
    return dispatch => {
        return axios.post("/user_match", data).then(
            response => {
                dispatch(getMatchById(response.data.matchId));
            },
            error => {
                console.log(error);
            }
        )
    }
};

export const removeUserFromMatch = (data) => {
    return dispatch => {
        return axios.delete("/user_match", {data}).then(
            response => {
                dispatch(getMatchById(response.data.matchId));
            },
            error => {
                console.log(error);
            }
        )
    }
};

export const confirmUserToMatch = (data) => {
    console.log(data);
    return dispatch => {
        return axios.patch("/user_match", {data}).then(
            response => {
                dispatch(getMatchById(response.data.matchId));
            },
            error => {
                console.log(error);
            }
        )
    }
};
