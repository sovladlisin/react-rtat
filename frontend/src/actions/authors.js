import axios from 'axios';

import { GET_AUTHORS, GET_AUTHOR, UPDATE_AUTHOR, CREATE_AUTHOR, DELETE_AUTHOR } from './types';
import { tokenConfig } from './auth'
import { returnErrors, createMessage } from './messages';

const action_name = "Автор"


//GET AUTHORs
export const getAuthors = () => (dispatch, getState) => {
    axios.get('/api/author/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_AUTHORS,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//GET AUTHOR
export const getAuthor = id => (dispatch, getState) => {
    axios.get(`/api/author/${id}/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_AUTHOR,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}


//UPDATE AUTHOR
export const updateAuthor = (id, obj) => (dispatch, getState) => {
    const body = JSON.stringify(obj)

    axios.put(`/api/author/${id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_AUTHOR,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//CREATE AUTHOR
export const createAuthor = obj => (dispatch, getState) => {
    const body = JSON.stringify(obj)
    axios.post(`/api/author/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_AUTHOR,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//DELETE AUTHOR
export const deleteAuthor = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/author/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ deleteSuccess: action_name + " #" + id }));
            dispatch({
                type: DELETE_AUTHOR,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};
