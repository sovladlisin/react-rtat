import { GET_CORPUSES, GET_CORPUS } from "../actions/types.js";

const initialState = {
    all: [],
    selected: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CORPUSES:
            return {
                ...state,
                all: action.payload
            };
        case GET_CORPUS:
            return {
                ...state,
                selected: action.payload
            };
        default:
            return state;
    }
}