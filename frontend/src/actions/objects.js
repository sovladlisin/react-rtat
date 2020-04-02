import axios from 'axios';
import qs from 'qs';

import { GET_OBJECT, GET_OBJECTS, GET_ENTITIES_TEXT, GET_ENTITIES_OBJECT, ADD_ENTITY, DELETE_ENTITY } from './types';

//GET OBJECTS
export const getObjects = () => dispatch => {
    axios.get('/api/object/').then(res => {
        dispatch({
            type: GET_OBJECTS,
            payload: res.data
        });
    }).catch(err => console.log(err));
}


//GET OBJECT
export const getObject = id => dispatch => {
    axios.get(`/api/object/${id}/`).then(res => {
        dispatch({
            type: GET_OBJECT,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//CREATE ENTITY
export const addEntity = entity => dispatch => {
    const er = qs.stringify(entity)
    axios.post(`/api/entity/`, er).then(res => {
        dispatch({
            type: ADD_ENTITY,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//DELETE ENTITY
export const deleteEntity = id => dispatch => {
    axios.delete(`/api/entity/${id}`).then(res => {
        dispatch({
            type: DELETE_ENTITY,
            payload: id
        });
    }).catch(err => console.log(err));
}

//GET ENTITIES FROM TEXT
export const getEntitiesFromText = text_id => dispatch => {
    axios.get(`/api/entity/`).then(res => {
        const result = res.data.filter(item => item.origin_text == text_id)
        dispatch({
            type: GET_ENTITIES_TEXT,
            payload: result
        });
    }).catch(err => console.log(err));
}

//GET ENTITIES FROM OBJECT
export const getEntitiesFromObject = object_id => dispatch => {
    axios.get(`/api/entity/`).then(res => {
        const result = res.data.filter(item => item.obj == object_id)
        dispatch({
            type: GET_ENTITIES_OBJECT,
            payload: result
        });
    }).catch(err => console.log(err));
}