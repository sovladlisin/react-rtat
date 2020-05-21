import axios from 'axios';

import { GET_PLACES, GET_PLACE, UPDATE_PLACE, CREATE_PLACE } from './types';
import { tokenConfig } from './auth'

//GET PLACES
export const getPlaces = () => (dispatch, getState) => {
    axios.get('/api/place/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_PLACES,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//GET PLACE
export const getPlace = id => (dispatch, getState) => {
    axios.get(`/api/place/${id}/`, tokenConfig(getState)).then(res => {

        dispatch({
            type: GET_PLACE,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//UPDATE PLACE
export const updatePlace = (id, obj) => (dispatch, getState) => {
    const body = JSON.stringify(obj)

    axios.put(`/api/place/${id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_PLACE,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//CREATE PLACE
export const createPlace = obj => (dispatch, getState) => {
    const body = JSON.stringify(obj)
    axios.post(`/api/place/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_PLACE,
            payload: res.data
        });
    }).catch(err => console.log(err));
}