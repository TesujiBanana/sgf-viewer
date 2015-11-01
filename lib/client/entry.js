"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reduxRouter = require("redux-router");

var _createBrowserHistory = require("history/lib/createBrowserHistory");

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require("redux-logger");

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

var _reducer = require("./reducer");

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loggerMiddleware = (0, _reduxLogger2.default)();

var store = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default, // lets us dispatch() functions
loggerMiddleware // neat middleware that logs actions
), (0, _reduxRouter.reduxReactRouter)({ routes: _routes2.default, createHistory: _createBrowserHistory2.default }))(_redux.createStore)(_reducer2.default);

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(_reduxRouter.ReduxRouter, { routes: _routes2.default })
), document.getElementById('app'));