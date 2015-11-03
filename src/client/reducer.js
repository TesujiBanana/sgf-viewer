import _ from "underscore";

import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

function merge(source, obj) {
  return _.extend({}, source, obj);
}

function SGFReducer(state={}, action) {
  switch (action.type) {
    case "RECEIVE_SGF": {
      let sgf = action.sgf;
      let gameInfo = {
        name: sgf.GN,
        date: sgf.DT,
        event: sgf.EV,
        rules: sgf.RU,
        overtimeMethod: sgf.OT,
        timeLimits: sgf.TM,
        blackPlayer: sgf.PB,
        blackPlayerRank: sgf.BR,
        whitePlayer: sgf.PW,
        whitePlayerRank: sgf.WR,
        info: sgf.GC,
        source: sgf.SO,
        copyright: sgf.CP
      };
      return merge(state, { sgf, gameInfo, currentNode: sgf });
    }
    default:
      return state;
  };
};

export default combineReducers({
  router: routerStateReducer,
  sgf: SGFReducer
});
