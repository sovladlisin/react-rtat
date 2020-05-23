import { GET_ERRORS } from '../actions/types';

const initialState = {
    msg: {},
    status: null,
    custom_message: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                custom_message: action.payload.custom_message
            };
        default:
            return state;
    }
}