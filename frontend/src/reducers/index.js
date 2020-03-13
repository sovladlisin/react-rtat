import { combineReducers } from 'redux';
import tests from './tests';
import resources from './resources';
import corpuses from './corpuses';
import pins from './pins'
import authors from './authors'

export default combineReducers({
    tests,
    resources,
    pins,
    corpuses,
    authors
});