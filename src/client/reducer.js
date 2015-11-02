import _ from "underscore";

import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

function merge(source, obj) {
  return _.extend({}, source, obj);
}

function SGFReducer(state={}, action) {
  switch (action.type) {
    case "RECEIVE_SGF": {
      return merge(state, { sgf: action.sgf, currentNode: action.sgf });
    }
    default:
      return state;
  };
};

export default combineReducers({
  router: routerStateReducer,
  sgf: SGFReducer
});
