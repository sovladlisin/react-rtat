import axios from 'axios';

import { GET_RESOURCES, GET_RESOURCE, GET_RESOURCE_TYPES, GET_RESOURCE_WORKSPACE } from './types';

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

export const getResourceWorkspace = id => dispatch => {

    var parents, children = []
    var result = {}

    axios.get(`/api/textToText/`).then(res => {
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
                axios.get(`/api/resource/${id}/`).then(res => {
                    result['original'] = res.data
                    axios.get(`/api/resource/${children[0]}/`).then(res => {
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
            axios.get(`/api/resource/${id}/`).then(res => {
                result['translated'] = res.data
                axios.get(`/api/resource/${parents[0]}/`).then(res => {
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

