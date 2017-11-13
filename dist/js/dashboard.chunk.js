webpackJsonp([1],{

/***/ 360:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _getPrototypeOf = __webpack_require__(163);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(189);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(190);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(194);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(241);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _dec, _class;
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(249);
	
	var _dashboard = __webpack_require__(345);
	
	var Actions = _interopRequireWildcard(_dashboard);
	
	var _reactRouter = __webpack_require__(287);
	
	var _redux = __webpack_require__(264);
	
	var _style = __webpack_require__(713);
	
	var _style2 = _interopRequireDefault(_style);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var Dashboard = (_dec = (0, _reactRedux.connect)(function (_ref) {
	    var dashboard = _ref.dashboard;
	    return { dashboard: dashboard };
	}, function (dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)(Actions, dispatch)
	    };
	}), _dec(_class = function (_Component) {
	    (0, _inherits3["default"])(Dashboard, _Component);
	
	    function Dashboard(props) {
	        (0, _classCallCheck3["default"])(this, Dashboard);
	
	        var _this = (0, _possibleConstructorReturn3["default"])(this, (Dashboard.__proto__ || (0, _getPrototypeOf2["default"])(Dashboard)).call(this, props));
	
	        _this._handleModal = function () {
	            _this.setState({ show: !_this.state.show });
	        };
	
	        _this.state = {
	            show: false
	        };
	        return _this;
	    }
	
	    (0, _createClass3["default"])(Dashboard, [{
	        key: 'render',
	        value: function render() {
	            var actions = this.props.actions;
	
	            var state = this.state;
	            return _react2["default"].createElement(
	                'div',
	                { className: _style2["default"].container },
	                _react2["default"].createElement(
	                    'div',
	                    { className: _style2["default"]['red'], onClick: function onClick() {
	                            return actions.add(1);
	                        } },
	                    'add'
	                ),
	                this.props.dashboard.count,
	                _react2["default"].createElement('br', null),
	                _react2["default"].createElement(
	                    _reactRouter.Link,
	                    { to: '/antComponent' },
	                    'antComponent'
	                ),
	                _react2["default"].createElement(
	                    _reactRouter.Link,
	                    { to: '/testComponent' },
	                    'testComponent'
	                )
	            );
	        }
	    }]);
	    return Dashboard;
	}(_react.Component)) || _class);
	exports["default"] = Dashboard;

/***/ }),

/***/ 713:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"container":"style__container","red":"style__red","blue1":"style__blue1","blue2":"style__blue2"};

/***/ })

});
//# sourceMappingURL=dashboard.chunk.js.map