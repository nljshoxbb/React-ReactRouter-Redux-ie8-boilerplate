import React, { Component } from 'react';
import styles from './style.scss';

class ToastComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: this.props.show,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show != this.state.show) {
            this.setState({ show: nextProps.show });
        }
    }

    render() {
        return (
            <div className={`${styles.toast} ${this.state.show ? ' show' : ' hide'}`}>
                <div className={styles.msg}>{this.props.msg}</div>
            </div>
        );
    }
}

ToastComponent.defaultProps = {
    show: false,
    msg: '加载中...'
}

var containerDOM = null;
var Toast = {};
var config = {}
Toast.show = function (conf) {
    conf = conf || {};
    let closeTime = conf.closeTime || 2000;
    conf.show = true;
    config = conf;
    conf.onClose = function () {
        Toast.Close();
    };
    if (!containerDOM) {
        containerDOM = document.createElement('div');
        document.body.appendChild(containerDOM);
    }
    ReactDOM.render(React.createElement(ToastComponent, conf), containerDOM);
    setTimeout(function () {
        Toast.Close();
    }, closeTime)
};
Toast.Close = function (content, type) {
    config.show = false;
    ReactDOM.render(React.createElement(ToastComponent, config), containerDOM);
    setTimeout(function () {
        ReactDOM.render(<div />, containerDOM);
    }, 500)


};
export default Toast;