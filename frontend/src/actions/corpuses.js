import axios from 'axios';

import { GET_CORPUSES, GET_CORPUS, GET_CORPUS_RESOURCES, GET_CORPUS_AUTHORS, GET_CORPUS_PLACES, GET_CORPUS_CLASSES, GET_CORPUS_OBJECTS } from './types';

//GET CORPUSES
export const getCorpuses = () => dispatch => {
    axios.get('/api/corpus/').then(res => {
        dispatch({
            type: GET_CORPUSES,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//GET CORPUS
export const getCorpus = id => dispatch => {
    axios.get(`/api/corpus/${id}/`).then(res => {
        dispatch({
            type: GET_CORPUS,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//GET CORPUS RESOURCES
export const getCorpusResources = id => dispatch => {
    axios.get(`/api/resource/`).then(res => {

        var resources = res.data.filter(function (res) {
            return res.corpus == id;
        });

        dispatch({
            type: GET_CORPUS_RESOURCES,
            payload: resources
        });

    }).catch(err => console.log(err));
}

//GET CORPUS AUTHORS
export const getCorpusAuthors = id => dispatch => {
    axios.get(`/api/corpusAuthors/`).then(res => {

        var authors_ids = res.data.filter(function (res) {
            return res.corpus == id;
        }).map(item => item.author);

        axios.get(`/api/author/`).then(res => {
            var authors = res.data.filter(function (res) {
                return authors_ids.includes(res.id);
            });

            dispatch({
                type: GET_CORPUS_AUTHORS,
                payload: authors
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}

//GET CORPUS PLACES
export const getCorpusPlaces = id => dispatch => {
    axios.get(`/api/corpusPlaces/`).then(res => {

        var places_ids = res.data.filter(function (res) {
            return res.corpus == id;
        }).map(item => item.place);

        axios.get(`/api/place/`).then(res => {
            var places = res.data.filter(function (res) {
                return places_ids.includes(res.id);
            });

            dispatch({
                type: GET_CORPUS_PLACES,
                payload: places
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}

//GET CORPUS CLASSES
export const getCorpusClasses = id => dispatch => {
    axios.get(`/api/class/`).then(res => {
        var classes = res.data.filter(item => item.corpus == id)

        dispatch({
            type: GET_CORPUS_CLASSES,
            payload: classes
        });

    }).catch(err => console.log(err));
}

//GET CORPUS OBJECTS
export const getCorpusObjects = id => dispatch => {
    axios.get(`/api/class/`).then(res => {

        var classes_id = res.data.filter(item => item.corpus == id).map(item => item.id)

        axios.get(`/api/object/`).then(res => {

            var objects = res.data.filter(item => classes_id.includes(item.id))

            dispatch({
                type: GET_CORPUS_OBJECTS,
                payload: objects
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}
