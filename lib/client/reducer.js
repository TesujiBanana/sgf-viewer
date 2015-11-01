'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxRouter = require('redux-router');

function SGFReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    default:
      return state;
  };
};

exports.default = (0, _redux.combineReducers)({
  router: _reduxRouter.routerStateReducer,
  SGF: SGFReducer
});