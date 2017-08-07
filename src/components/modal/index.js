import React, { Component } from 'react';
import './style.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Modal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: this.props.show
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show != this.state.show) {
            this.setState({ show: nextProps.show });
        }
    }

    _close = () => {
        this.setState({ show: false });
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        const { show } = this.state;
        const { showClass } = this.props;

        const height = {
            height: document.body.offsetHeight < document.body.scrollHeight ?
                document.body.scrollHeight : document.body.offsetHeight
        }

        return (

            <ReactCSSTransitionGroup
                transitionName="backdrop-animate"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                {show && <div key="0" className={`modal `}>
                    <div className={`modal-backdrop in`} style={height}></div>
                    <ReactCSSTransitionGroup
                        transitionName="dialog-animate"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                        <div key="1" className={`modal-dialog `}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="fs18">{this.props.title}</h4>
                                    <div className="bootbox-close-button close" onClick={this._close}>×</div>
                                </div>
                                <div className="modal-body">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </ReactCSSTransitionGroup>
                </div>}
            </ReactCSSTransitionGroup>
        );
    }
}

Modal.defaultProps = {
    show: false,
    title: '系统提示',
    showClass: 'fadeInUp'
}

var containerDOM = null;
var config = {};
Modal.show = function (opt = { child: "", conf: {} }) {
    let conf = opt.conf ? opt.conf : {};
    let child = opt.child ? opt.child : '';
    conf.show = true;
    conf.onClose = () => {
        Modal.close();
    }
    config = conf;
    if (!containerDOM) {
        containerDOM = document.createElement('div');
        document.body.appendChild(containerDOM);
    }
    ReactDOM.render(React.createElement(Modal, conf, child), containerDOM);

};
Modal.close = function () {
    config.show = false;
    ReactDOM.render(React.createElement(Modal, config), containerDOM);
    setTimeout(function () {
        ReactDOM.render(<div />, containerDOM);
    }, 500)
};

export default Modal;