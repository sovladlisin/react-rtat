import { GET_RESOURCES, GET_RESOURCE, GET_RESOURCE_TYPES, GET_RESOURCE_WORKSPACE } from "../actions/types.js";

const initialState = {
    all: [],
    selected: {},
    types: [],
    workspace_texts: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RESOURCES:
            return {
                ...state,
                all: action.payload
            };
        case GET_RESOURCE:
            return {
                ...state,
                selected: action.payload
            };
        case GET_RESOURCE_TYPES:
            return {
                ...state,
                types: action.payload
            };
        case GET_RESOURCE_WORKSPACE:
            return {
                ...state,
                workspace_texts: action.payload
            };

        default:
            return state;
    }
}

