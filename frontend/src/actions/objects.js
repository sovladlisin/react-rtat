import axios from 'axios';
import qs from 'qs';

import { GET_OBJECT, GET_OBJECTS, GET_ENTITIES_TEXT, GET_ENTITIES_OBJECT, ADD_ENTITY, DELETE_ENTITY } from './types';
import { tokenConfig } from './auth'



//GET OBJECTS
export const getObjects = () => (dispatch, getState) => {
    axios.get('/api/object/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_OBJECTS,
            payload: res.data
        });
    }).catch(err => console.log(err));
}


//GET OBJECT
export const getObject = id => (dispatch, getState) => {
    axios.get(`/api/object/${id}/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_OBJECT,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//CREATE ENTITY
export const addEntity = entity => (dispatch, getState) => {
    const er = qs.stringify(entity)
    axios.post(`/api/entity/`, er, tokenConfig(getState)).then(res => {
        dispatch({
            type: ADD_ENTITY,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//DELETE ENTITY
export const deleteEntity = id => (dispatch, getState) => {
    axios.delete(`/api/entity/${id}`, tokenConfig(getState)).then(res => {
        dispatch({
            type: DELETE_ENTITY,
            payload: id
        });
    }).catch(err => console.log(err));
}

//GET ENTITIES FROM TEXT
export const getEntitiesFromText = text_id => (dispatch, getState) => {
    axios.get(`/api/entity/`, tokenConfig(getState)).then(res => {
        const result = res.data.filter(item => item.origin_text == text_id)
        dispatch({
            type: GET_ENTITIES_TEXT,
            payload: result
        });
    }).catch(err => console.log(err));
}

//GET ENTITIES FROM OBJECT
export const getEntitiesFromObject = object_id => (dispatch, getState) => {
    axios.get(`/api/entity/`, tokenConfig(getState)).then(res => {
        const result = res.data.filter(item => item.obj == object_id)
        dispatch({
            type: GET_ENTITIES_OBJECT,
            payload: result
        });
    }).catch(err => console.log(err));
}