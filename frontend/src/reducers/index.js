import { combineReducers } from 'redux';
import tests from './tests';
import resources from './resources';
import corpuses from './corpuses';
import pins from './pins'
import authors from './authors'
import windows from './windows'
import places from './places'
import classes from './classes'
import objects from './objects'

export default combineReducers({
    tests,
    resources,
    pins,
    corpuses,
    authors,
    windows,
    places,
    classes,
    objects
});