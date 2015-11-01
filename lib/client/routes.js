"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require("react-router");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(_reactRouter.Route, { component: _app2.default, path: "/" });

//
// <IndexRoute component={CPList} />
// <Route component={CPShow} path="/content_partner/:id" />