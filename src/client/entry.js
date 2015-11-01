"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter, ReduxRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory'

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
const loggerMiddleware = createLogger();

import routes from "./routes";
import reducer from "./reducer";

const store = compose(
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  ),
  reduxReactRouter({routes, createHistory})
)(createStore)(reducer);

ReactDOM.render(
  <Provider store={store}>
    <ReduxRouter routes={routes} />
  </Provider>, document.getElementById('app')
);
