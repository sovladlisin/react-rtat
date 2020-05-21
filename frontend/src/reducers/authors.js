import { GET_AUTHORS, GET_AUTHOR, UPDATE_AUTHOR, CREATE_AUTHOR } from "../actions/types.js";

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
        case UPDATE_AUTHOR:
            return {
                ...state,
                all: [...state.all, action.payload],
                selected: action.payload
            };
        case CREATE_AUTHOR:
            return {
                ...state,
                all: [...state.all, action.payload],
            };
        default:
            return state;
    }
}