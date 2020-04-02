import { GET_OBJECT, GET_OBJECTS, GET_ENTITIES_TEXT, GET_ENTITIES_OBJECT, ADD_ENTITY, DELETE_ENTITY } from "../actions/types.js";

const initialState = {
    all: [],
    selected: {},
    entities_text: [],
    entities_object: []
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
        case GET_ENTITIES_TEXT:
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
        default:
            return state;
    }
}
