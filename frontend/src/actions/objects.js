import axios from 'axios';

import { GET_OBJECT, GET_OBJECTS } from './types';

//GET OBJECTS
export const getObjects = () => dispatch => {
    axios.get('/api/object/').then(res => {
        dispatch({
            type: GET_OBJECTS,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//GET OBJECT
export const getObject = id => dispatch => {
    axios.get(`/api/object/${id}/`).then(res => {
        dispatch({
            type: GET_OBJECT,
            payload: res.data
        });
    }).catch(err => console.log(err));
}