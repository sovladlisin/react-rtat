import { GET_CORPUSES, GET_CORPUS, GET_CORPUS_RESOURCES, GET_CORPUS_AUTHORS, GET_CORPUS_PLACES, GET_CORPUS_OBJECTS, GET_CORPUS_CLASSES, UPDATE_CORPUS } from "../actions/types.js";

const initialState = {
    all: [],
    selected: {},
    resources: [],
    authors: [],
    places: [],
    classes: [],
    objects: []
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
        case UPDATE_CORPUS:
            return {
                ...state,
                all: [...state.all, action.payload],
                selected: action.payload
            };
        case GET_CORPUS_RESOURCES:
            return {
                ...state,
                resources: action.payload
            };

        case GET_CORPUS_AUTHORS:
            return {
                ...state,
                authors: action.payload
            };

        case GET_CORPUS_PLACES:
            return {
                ...state,
                places: action.payload
            };

        case GET_CORPUS_CLASSES:
            return {
                ...state,
                classes: action.payload
            };

        case GET_CORPUS_OBJECTS:
            return {
                ...state,
                objects: action.payload
            };

        default:
            return state;
    }
}