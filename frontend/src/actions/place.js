import axios from 'axios';

import { GET_PLACES, GET_PLACE } from './types';

//GET PLACES
export const getPlaces = () => dispatch => {
    axios.get('/api/place/').then(res => {
        dispatch({
            type: GET_PLACES,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//GET PLACE
export const getPlace = id => dispatch => {
    axios.get(`/api/place/${id}/`).then(res => {

        dispatch({
            type: GET_PLACE,
            payload: res.data
        });
    }).catch(err => console.log(err));
}