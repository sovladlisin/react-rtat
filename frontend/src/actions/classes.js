import axios from 'axios';

import { GET_CLASS, GET_CLASSES, UPDATE_CLASS } from './types';
import { tokenConfig } from './auth'
//GET CLASSES
export const getClasses = () => (dispatch, getState) => {
    axios.get('/api/class/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_CLASSES,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//GET CLASS
export const getClass = id => (dispatch, getState) => {
    axios.get(`/api/class/${id}/`, tokenConfig(getState)).then(res => {

        dispatch({
            type: GET_CLASS,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//UPDATE CLASS
export const updateClass = (id, obj) => (dispatch, getState) => {
    const body = JSON.stringify(obj)

    axios.put(`/api/class/${id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_CLASS,
            payload: res.data
        });
    }).catch(err => console.log(err));
}