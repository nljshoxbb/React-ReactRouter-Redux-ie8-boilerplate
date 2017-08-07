import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import syncHistoryWithStore from 'react-router-redux/lib/sync';
import { routerReducer } from 'react-router-redux/lib/reducer';
import routerMiddleware from 'react-router-redux/lib/middleware';
import { Router, Route, IndexRoute } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory'
import asyncRequestMiddleware from '../middleware/asyncRequest.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = routerMiddleware(createHashHistory());

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(
            asyncRequestMiddleware,
        )
        )

    )
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default
            store.replaceReducer(nextReducer)
        })
    }

    return store
}