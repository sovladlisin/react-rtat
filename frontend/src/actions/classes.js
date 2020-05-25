import axios from 'axios';

import { GET_CLASS, GET_CLASSES, UPDATE_CLASS, CREATE_CLASS, DELETE_CLASS } from './types';
import { tokenConfig } from './auth'
import { returnErrors, createMessage } from './messages';

const action_name = "Класс"

//GET CLASSES
export const getClasses = () => (dispatch, getState) => {
    axios.get('/api/class/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_CLASSES,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}


//GET CLASS
export const getClass = id => (dispatch, getState) => {
    axios.get(`/api/class/${id}/`, tokenConfig(getState)).then(res => {

        dispatch({
            type: GET_CLASS,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//UPDATE CLASS
export const updateClass = (id, obj) => (dispatch, getState) => {
    const body = JSON.stringify(obj)

    axios.put(`/api/class/${id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_CLASS,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//CREATE CLASS
export const createClass = obj => (dispatch, getState) => {
    const body = JSON.stringify(obj)
    axios.post(`/api/class/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_CLASS,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//DELETE CLASS
export const deleteClass = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/class/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ deleteSuccess: action_name + " #" + id }));
            dispatch({
                type: DELETE_CLASS,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};
