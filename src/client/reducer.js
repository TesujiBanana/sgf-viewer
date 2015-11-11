import _ from "underscore";

import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

function merge(source, obj) {
  return _.extend({}, source, obj);
}

let initialState = {
  nodes: [],
  gameInfo: {},
  currentNode: null
};

function SGFReducer(state=initialState, action) {
  switch (action.type) {
    case "RECEIVE_SGF": {
      let nodes = action.sgf;
      let currentNode = nodes[0];
      let gameInfo = {
        name: currentNode.GN,
        date: currentNode.DT,
        event: currentNode.EV,
        rules: currentNode.RU,
        overtimeMethod: currentNode.OT,
        timeLimits: currentNode.TM,
        blackPlayer: currentNode.PB,
        blackPlayerRank: currentNode.BR,
        whitePlayer: currentNode.PW,
        whitePlayerRank: currentNode.WR,
        info: currentNode.GC,
        source: currentNode.SO,
        copyright: currentNode.CP
      };
      return merge(state, { nodes, gameInfo, currentNode });
    }
    case "NAVIGATE_BACK": {
      if (state.currentNode && state.currentNode._parent) {
        return merge(state, { currentNode: state.currentNode._parent })
      } else {
        return state;
      }
    }
    case "NAVIGATE_FORWARD": {
      if (state.currentNode && state.currentNode._next) {
        return merge(state, { currentNode: state.currentNode._next })
      } else {
        return state;
      }
    }
    case "NAVIGATE_TO_MOVE": {
      // TODO: some sort of error checking
      console.log(action);
      return merge(state, { currentNode: action.move })
    }
    default:
      return state;
  };
};

export default combineReducers({
  router: routerStateReducer,
  sgf: SGFReducer
});
