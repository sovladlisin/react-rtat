import { GET_RESOURCES, GET_RESOURCE, GET_RESOURCE_TYPES, GET_RESOURCE_WORKSPACE, UPDATE_RESOURCE, CREATE_RESOURCE_TYPE, DELETE_RESOURCE } from "../actions/types.js";

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
        case UPDATE_RESOURCE:
            return {
                ...state,
                all: [...state.all, action.payload],
                selected: action.payload
            };
        case CREATE_RESOURCE_TYPE:
            return {
                ...state,
                types: [...state.types, action.payload]
            }
        case DELETE_RESOURCE:
            return {
                ...state,
                all: state.all.filter((item) => item.id !== action.payload),
            };
        default:
            return state;
    }
}

