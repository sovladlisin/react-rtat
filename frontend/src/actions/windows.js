import axios from 'axios';

import { CREATE_WINDOW } from './types';

//CREATE_WINDOW
export const createWindow = (id, name, model_name = null, pk = null) => dispatch => {
    dispatch({
        type: CREATE_WINDOW,
        payload: { model_name: model_name, id: id, name: name, pk: pk }
    });
}