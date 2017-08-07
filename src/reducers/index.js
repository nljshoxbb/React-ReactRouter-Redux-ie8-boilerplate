import syncHistoryWithStore from 'react-router-redux/lib/sync';
import { routerReducer } from 'react-router-redux/lib/reducer';
import { combineReducers } from 'redux';

import dashboard from './dashboard';

const rootReducer = combineReducers({
    dashboard,
    routing: routerReducer
});


export default rootReducer;