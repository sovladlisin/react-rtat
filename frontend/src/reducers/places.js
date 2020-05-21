import { GET_PLACES, GET_PLACE, UPDATE_OBJECT, CREATE_PLACE } from "../actions/types.js";

const initialState = {
    all: [],
    selected: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PLACES:
            return {
                ...state,
                all: action.payload
            };
        case GET_PLACE:
            return {
                ...state,
                selected: action.payload
            };
        case UPDATE_OBJECT:
            return {
                ...state,
                all: [...state.all, action.payload],
                selected: action.payload
            };
        case CREATE_PLACE:
            return {
                ...state,
                all: [...state.all, action.payload]
            }
        default:
            return state;
    }
}