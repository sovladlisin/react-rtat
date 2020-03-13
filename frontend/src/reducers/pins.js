import { GET_PIN_WINDOW } from "../actions/types.js";

const initialState = {
    last_pin: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PIN_WINDOW:
            return {
                ...state,
                last_pin: action.payload
            };
        default:
            return state;
    }
}

