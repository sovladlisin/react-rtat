import axios from 'axios';

import { GET_TESTS } from './types';

//GET TESTS
export const getTests = () => dispatch => {
    axios.get('/api/test/').then(res => {
        dispatch({
            type: GET_TESTS,
            payload: res.data
        });
    }).catch(err => console.log(err));
}
