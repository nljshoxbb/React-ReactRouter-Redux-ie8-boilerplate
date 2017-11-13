import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../../actions/dashboard.js';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import styles from './style.scss';

@connect((({ dashboard }) => ({ dashboard })), ((dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
})))
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    _handleModal = () => {
        this.setState({ show: !this.state.show });
    }


    render() {
        const { actions } = this.props;
        const state = this.state;
        return (
            <div className={styles.container}>
                <div className={styles['red']} onClick={() => actions.add(1)}>add</div>
                {this.props.dashboard.count}
                <br />
                <Link to="/antComponent">antComponent</Link>
                <Link to="/testComponent">testComponent</Link>
            </div>
        );
    }
}

export default Dashboard;