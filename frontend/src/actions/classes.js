import axios from 'axios';

import { GET_CLASS, GET_CLASSES } from './types';

//GET CLASSES
export const getClasses = () => dispatch => {
    axios.get('/api/class/').then(res => {
        dispatch({
            type: GET_CLASSES,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//GET CLASS
export const getClass = id => dispatch => {
    axios.get(`/api/class/${id}/`).then(res => {

        dispatch({
            type: GET_CLASS,
            payload: res.data
        });
    }).catch(err => console.log(err));
}