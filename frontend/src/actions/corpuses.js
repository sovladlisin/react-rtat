import axios from 'axios';

import { GET_CORPUSES, GET_CORPUS } from './types';

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