import axios from 'axios';

import { GET_RESOURCES, GET_RESOURCE, GET_RESOURCE_TYPES } from './types';

//GET RESOURCES
export const getResources = () => dispatch => {
    axios.get('/api/resource/').then(res => {
        dispatch({
            type: GET_RESOURCES,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//GET RESOURCE
export const getResource = id => dispatch => {
    axios.get(`/api/resource/${id}/`).then(res => {
        dispatch({
            type: GET_RESOURCE,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

export const getResourceTypes = () => dispatch => {
    axios.get('/api/resourceType/').then(res => {
        dispatch({
            type: GET_RESOURCE_TYPES,
            payload: res.data
        });
    }).catch(err => console.log(err));
}