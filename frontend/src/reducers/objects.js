import { GET_OBJECT, GET_OBJECTS } from "../actions/types.js";

const initialState = {
    all: [],
    selected: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_OBJECTS:
            return {
                ...state,
                all: action.payload
            };
        case GET_OBJECT:
            return {
                ...state,
                selected: action.payload
            };
        default:
            return state;
    }
}