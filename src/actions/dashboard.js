import * as Types from '../constants';

const NAMESPACE = 'dashboard';

export function add(params) {
    // return (dispatch, getState) => {
    //     dispatch({
    //         types: '',
    //     })
    // }

    return {
        type:`${NAMESPACE}/ADD`,
        payload:params
    }

}