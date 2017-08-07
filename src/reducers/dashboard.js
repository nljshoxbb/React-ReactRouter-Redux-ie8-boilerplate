import * as Types from '../constants';
import * as Actions from '../actions/dashboard.js';

const NAMESPACE = 'dashboard';
const initialState = {
    count: 0
}


export function countReducer(state, { type, payload }) {
    switch (type) {
        case `${NAMESPACE}/ADD`:
            return state + payload
        default:
            return state;
    }
}

export default function borrow(state = initialState, action) {
    return {
        ...initialState,
        count: countReducer(state.count, action, NAMESPACE),

    }

}

