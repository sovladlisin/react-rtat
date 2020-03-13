import { GET_AUTHORS, GET_AUTHOR } from "../actions/types.js";

const initialState = {
    all: [],
    selected: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_AUTHORS:
            return {
                ...state,
                all: action.payload
            };
        case GET_AUTHOR:
            return {
                ...state,
                selected: action.payload
            };
        default:
            return state;
    }
}