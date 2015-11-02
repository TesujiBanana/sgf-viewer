"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require("react-router");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

var _gist = require("./components/gist");

var _gist2 = _interopRequireDefault(_gist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { component: _app2.default, path: "/" },
  _react2.default.createElement(_reactRouter.Route, { component: _gist2.default, path: "/g/**" })
);