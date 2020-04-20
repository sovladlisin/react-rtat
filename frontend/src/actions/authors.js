import axios from 'axios';

import { GET_AUTHORS, GET_AUTHOR } from './types';
import { tokenConfig } from './auth'
//GET CORPUSES
export const getAuthors = () => (dispatch, getState) => {
    axios.get('/api/author/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_AUTHORS,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//GET CORPUS
export const getAuthor = id => (dispatch, getState) => {
    axios.get(`/api/author/${id}/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_AUTHOR,
            payload: res.data
        });
    }).catch(err => console.log(err));
}