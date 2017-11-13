import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, IndexRoute } from 'react-router';
import syncHistoryWithStore from 'react-router-redux/lib/sync';
import { routerReducer } from 'react-router-redux/lib/reducer';
import createHashHistory from 'history/lib/createHashHistory';
import configureStore from '../../store';
import * as Actions from '../../actions/dashboard.js';


const store = configureStore();
const history = syncHistoryWithStore(createHashHistory(), store);

@connect((({ app }) => ({ app })), ((dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
})))
class Index extends Component {
    render() {
        const pathname = this.props.location.pathname;
        const { center } = this.props;
        return (
            <div>
                {React.cloneElement(this.props.children || <div />, { key: pathname })}
            </div>
        );
    }
}


const routes = {
    component: Index,
    childRoutes: [
        {
            path: '/',
            getComponent: function (nextState, cb) {
                require.ensure([], function (require) {
                    cb(null, require('./dashboard').default)
                }, 'dashboard')
            }
        },
        {
            path: '/testComponent',
            getComponent: function (nextState, cb) {
                require.ensure([], function (require) {
                    cb(null, require('./testComponent').default)
                }, 'testComponent')
            }
        },
         {
            path: '/antComponent',
            getComponent: function (nextState, cb) {
                require.ensure([], function (require) {
                    cb(null, require('./antComponent').default)
                }, 'antComponent')
            }
        },

    ]
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history} routes={routes}></Router>
            </Provider>
        );
    }
}

export default App;