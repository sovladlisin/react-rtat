import { GET_TESTS } from "../actions/types.js";

const initialState = {
    tests: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TESTS:
            return {
                ...state,
                tests: action.payload
            };
        default:
            return state;
    }
}
