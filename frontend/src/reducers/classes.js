import { GET_CLASS, GET_CLASSES, UPDATE_CLASS, CREATE_CLASS } from "../actions/types.js";

const initialState = {
    all: [],
    selected: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CLASSES:
            return {
                ...state,
                all: action.payload
            };
        case GET_CLASS:
            return {
                ...state,
                selected: action.payload
            };
        case UPDATE_CLASS:
            return {
                ...state,
                all: [...state.all, action.payload],
                selected: action.payload
            };
        case CREATE_CLASS:
            return {
                ...state,
                all: [...state.all, action.payload],
            };
        default:
            return state;
    }
}