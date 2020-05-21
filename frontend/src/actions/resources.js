import axios from 'axios';

import { GET_RESOURCES, GET_RESOURCE, GET_RESOURCE_TYPES, GET_RESOURCE_WORKSPACE, UPDATE_RESOURCE, CREATE_RESOURCE_TYPE } from './types';
import { tokenConfig } from './auth'

//GET RESOURCES
export const getResources = () => (dispatch, getState) => {
    axios.get('/api/resource/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_RESOURCES,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//GET RESOURCE
export const getResource = id => (dispatch, getState) => {
    axios.get(`/api/resource/${id}/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_RESOURCE,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

export const getResourceTypes = () => (dispatch, getState) => {
    axios.get('/api/resourceType/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_RESOURCE_TYPES,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

export const getResourceWorkspace = id => (dispatch, getState) => {

    var parents, children = []
    var result = {}

    axios.get(`/api/textToText/`, tokenConfig(getState)).then(res => {
        parents = res.data.filter(item => item.translated == id).map(item => item.original)
        children = res.data.filter(item => item.original == id).map(item => item.translated)

        if (parents === undefined || parents.length == 0) {
            if (children === undefined || children.length == 0) {
                dispatch({
                    type: GET_RESOURCE_WORKSPACE,
                    payload: result
                });
            }
            else { //has a translated version
                axios.get(`/api/resource/${id}/`, tokenConfig(getState)).then(res => {
                    result['original'] = res.data
                    axios.get(`/api/resource/${children[0]}/`, tokenConfig(getState)).then(res => {
                        result['translated'] = res.data
                        dispatch({
                            type: GET_RESOURCE_WORKSPACE,
                            payload: result
                        });
                    }).catch(err => console.log(err));
                }).catch(err => console.log(err));
            }
        }
        else { // has an original
            axios.get(`/api/resource/${id}/`, tokenConfig(getState)).then(res => {
                result['translated'] = res.data
                axios.get(`/api/resource/${parents[0]}/`, tokenConfig(getState)).then(res => {
                    result['original'] = res.data
                    dispatch({
                        type: GET_RESOURCE_WORKSPACE,
                        payload: result
                    });
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }
    }).catch(err => console.log(err))

}

//UPDATE RESOURCE
export const updateResource = (id, obj) => (dispatch, getState) => {
    const body = JSON.stringify(obj)

    axios.put(`/api/resource/${id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_RESOURCE,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//CREATE OBJECT
export const createResourceType = obj => (dispatch, getState) => {
    const body = JSON.stringify(obj)
    axios.post(`/api/resourceType/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_RESOURCE_TYPE,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

