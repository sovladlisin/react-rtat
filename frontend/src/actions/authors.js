import axios from 'axios';

import { GET_AUTHORS, GET_AUTHOR } from './types';

//GET CORPUSES
export const getAuthors = () => dispatch => {
    axios.get('/api/author/').then(res => {
        dispatch({
            type: GET_AUTHORS,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

//GET CORPUS
export const getAuthor = id => dispatch => {
    axios.get(`/api/author/${id}/`).then(res => {
        dispatch({
            type: GET_AUTHOR,
            payload: res.data
        });
    }).catch(err => console.log(err));
}