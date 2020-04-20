import axios from 'axios';

import { GET_PLACES, GET_PLACE } from './types';
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