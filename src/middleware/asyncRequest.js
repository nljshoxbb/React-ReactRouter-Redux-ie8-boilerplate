// import { createAction } from '../utils';
// import * as Types from '../constants';
// import { changePage } from '../actions/commons.js';
// import Toast from '../components/Toast.jsx';
// import Process from '../components/Process.jsx';
var Promise = require('es6-promise').Promise;
const initialPage = {
    record_count: 0,
    page_count: 1,
    page_index: 1
}
const asyncRequestMiddleware = ({ dispatch, getState }) => next => action => {
    const {
        types,
        callAPI,
        payload = {}
    } = action

    if (!types) {
        return next(action);
    }
    if (
        !Array.isArray(types) ||
        types.length !== 3 ||
        !types.every(type => typeof type === 'string')
    ) {
        throw new Error('Expected an array of three string types.')
    }
    if (typeof callAPI !== 'function') {
        throw new Error('Expected callAPI to be a function.')
    }
    
    const [requestType, successType, failureType] = types;
    const namespace = successType.split('/')[0];

    const { center } = getState();


    return callAPI().then((result) => {
        console.log(result)
    }, (error) => {

    })

}

export default asyncRequestMiddleware;