import axios from 'axios';

import { GET_CORPUSES, GET_CORPUS, GET_CORPUS_RESOURCES, GET_CORPUS_AUTHORS, GET_CORPUS_PLACES, GET_CORPUS_CLASSES, GET_CORPUS_OBJECTS, UPDATE_CORPUS, CREATE_CORPUS, DELETE_CORPUS } from './types';
import { tokenConfig } from './auth'
import { returnErrors, createMessage } from './messages';

const action_name = "Корпус"


import qs from 'qs';

//GET CORPUSES
export const getCorpuses = () => (dispatch, getState) => {
    axios.get('/api/corpus/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_CORPUSES,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//GET CORPUS
export const getCorpus = id => (dispatch, getState) => {
    axios.get(`/api/corpus/${id}/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_CORPUS,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//UPDATE CORPUS
export const updateCorpus = (id, corpus) => (dispatch, getState) => {
    const body = JSON.stringify(corpus)

    axios.put(`/api/corpus/${id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_CORPUS,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//GET CORPUS RESOURCES
export const getCorpusResources = id => (dispatch, getState) => {
    axios.get(`/api/resource/`, tokenConfig(getState)).then(res => {

        var resources = res.data.filter(function (res) {
            return res.corpus == id;
        });

        dispatch({
            type: GET_CORPUS_RESOURCES,
            payload: resources
        });

    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//GET CORPUS AUTHORS
export const getCorpusAuthors = id => (dispatch, getState) => {
    axios.get(`/api/corpusAuthors/`, tokenConfig(getState)).then(res => {

        var authors_ids = res.data.filter(function (res) {
            return res.corpus == id;
        }).map(item => item.author);

        axios.get(`/api/author/`, tokenConfig(getState)).then(res => {
            var authors = res.data.filter(function (res) {
                return authors_ids.includes(res.id);
            });

            dispatch({
                type: GET_CORPUS_AUTHORS,
                payload: authors
            });
        }).catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, action_name));
            dispatch({
                type: AUTH_ERROR,
            });
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//GET CORPUS PLACES
export const getCorpusPlaces = id => (dispatch, getState) => {
    axios.get(`/api/corpusPlaces/`, tokenConfig(getState)).then(res => {

        var places_ids = res.data.filter(function (res) {
            return res.corpus == id;
        }).map(item => item.place);

        axios.get(`/api/place/`, tokenConfig(getState)).then(res => {
            var places = res.data.filter(function (res) {
                return places_ids.includes(res.id);
            });

            dispatch({
                type: GET_CORPUS_PLACES,
                payload: places
            });
        }).catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, action_name));
            dispatch({
                type: AUTH_ERROR,
            });
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//GET CORPUS CLASSES
export const getCorpusClasses = id => (dispatch, getState) => {
    axios.get(`/api/class/`, tokenConfig(getState)).then(res => {
        var classes = res.data.filter(item => item.corpus == id)

        dispatch({
            type: GET_CORPUS_CLASSES,
            payload: classes
        });

    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//GET CORPUS OBJECTS
export const getCorpusObjects = id => (dispatch, getState) => {
    axios.get(`/api/class/`, tokenConfig(getState)).then(res => {

        var classes_id = res.data.filter(item => item.corpus == id).map(item => item.id)

        axios.get(`/api/object/`, tokenConfig(getState)).then(res => {

            var objects = res.data.filter(item => classes_id.includes(item.id))

            dispatch({
                type: GET_CORPUS_OBJECTS,
                payload: objects
            });
        }).catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, action_name));
            dispatch({
                type: AUTH_ERROR,
            });
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//CREATE AUTHOR
export const createCorpus = obj => (dispatch, getState) => {
    const body = JSON.stringify(obj)
    axios.post(`/api/corpus/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_CORPUS,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, action_name));

    });
}

//DELETE CORPUS
export const deleteCorpus = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/corpus/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ deleteSuccess: action_name + " #" + id }));
            dispatch({
                type: DELETE_CORPUS,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};