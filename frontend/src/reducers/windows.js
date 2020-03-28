import { CREATE_WINDOW } from "../actions/types.js";

const initialState = {
    opened_windows: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_WINDOW:
            {
                var windows = initialState.opened_windows
                if (windows.hasOwnProperty(action.payload.id)) {
                    if (windows[action.payload.id] === undefined) {
                        windows[action.payload.id] = {
                            id: action.payload.id,
                            name: action.payload.name,
                            model_name: action.payload.model_name,
                            pk: action.payload.pk
                        }
                    }
                }
                else {
                    windows[action.payload.id] = {
                        id: action.payload.id,
                        name: action.payload.name,
                        model_name: action.payload.model_name,
                        pk: action.payload.pk
                    }
                }

                return {
                    ...state,
                    opened_windows: windows
                };
            }
        default:
            return state;
    }
}