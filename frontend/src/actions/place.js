import axios from 'axios';

import { GET_PLACES, GET_PLACE, UPDATE_PLACE, CREATE_PLACE, DELETE_PLACE } from './types';
import { returnErrors, createMessage } from './messages';
import { tokenConfig } from './auth'

const action_name = "Место"


//GET PLACES
export const getPlaces = () => (dispatch, getState) => {
    axios.get('/api/place/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_PLACES,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//GET PLACE
export const getPlace = id => (dispatch, getState) => {
    axios.get(`/api/place/${id}/`, tokenConfig(getState)).then(res => {

        dispatch({
            type: GET_PLACE,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//UPDATE PLACE
export const updatePlace = (id, obj) => (dispatch, getState) => {
    const body = JSON.stringify(obj)

    axios.put(`/api/place/${id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_PLACE,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//CREATE PLACE
export const createPlace = obj => (dispatch, getState) => {
    const body = JSON.stringify(obj)
    axios.post(`/api/place/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_PLACE,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//DELETE PLACE
export const deletePlace = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/place/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ deleteSuccess: action_name + " #" + id }));
            dispatch({
                type: DELETE_PLACE,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};