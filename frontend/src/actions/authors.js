import axios from 'axios';

import { GET_AUTHORS, GET_AUTHOR, UPDATE_AUTHOR, CREATE_AUTHOR } from './types';
import { tokenConfig } from './auth'
//GET AUTHORs
export const getAuthors = () => (dispatch, getState) => {
    axios.get('/api/author/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_AUTHORS,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//GET AUTHOR
export const getAuthor = id => (dispatch, getState) => {
    axios.get(`/api/author/${id}/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_AUTHOR,
            payload: res.data
        });
    }).catch(err => console.log(err));
}


//UPDATE AUTHOR
export const updateAuthor = (id, obj) => (dispatch, getState) => {
    const body = JSON.stringify(obj)

    axios.put(`/api/author/${id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_AUTHOR,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//CREATE AUTHOR
export const createAuthor = obj => (dispatch, getState) => {
    const body = JSON.stringify(obj)
    axios.post(`/api/author/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_AUTHOR,
            payload: res.data
        });
    }).catch(err => console.log(err));
}
