import axios from 'axios';

import { GET_PIN_WINDOW } from './types';

// //GET PIN WINDOW
// export const getPinWindow = (model_name, id) => dispatch => {
//     axios.get(`/api/${model_name}/${id}/`).then(res => {
//         dispatch({
//             type: GET_PIN_WINDOW,
//             payload: res.data
//         });
//     }).catch(err => console.log(err));
// }