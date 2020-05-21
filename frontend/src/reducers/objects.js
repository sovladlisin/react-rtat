import { GET_MARKUP_ENTITES, GET_OBJECT, GET_OBJECTS, GET_ENTITIES_TEXT, GET_ENTITIES_OBJECT, ADD_ENTITY, DELETE_ENTITY, UPDATE_OBJECT, CREATE_OBJECT, GET_MARKUPS_TEXT, CREATE_MARKUP } from "../actions/types.js";

const initialState = {
    all: [],
    selected: {},
    entities_text: [],
    entities_object: [],
    markups: []
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
        case GET_MARKUP_ENTITES:
            return {
                ...state,
                entities_text: action.payload
            };
        case GET_ENTITIES_OBJECT:
            return {
                ...state,
                entities_object: action.payload,

            };
        case ADD_ENTITY:
            return {
                ...state,
                entities_object: [...state.entities_object, action.payload],
                entities_text: [...state.entities_text, action.payload]
            };
        case DELETE_ENTITY:
            return {
                ...state,
                entities_object: [...state.entities_object.filter(item => item.id != action.payload)],
                entities_text: [...state.entities_text.filter(item => item.id != action.payload)]
            };
        case UPDATE_OBJECT:
            return {
                ...state,
                all: [...state.all, action.payload],
                selected: action.payload
            };
        case CREATE_OBJECT:
            return {
                ...state,
                all: [...state.all, action.payload]
            }
        case GET_MARKUPS_TEXT:
            return {
                ...state,
                markups: action.payload
            }
        case CREATE_MARKUP:
            return {
                ...state,
                markups: [...state.markups, action.payload]
            }
        default:
            return state;
    }
}
