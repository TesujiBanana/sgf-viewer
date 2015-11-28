import _ from "underscore";
import {playMove, InvalidMoveException} from "go-game-rules";

import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

function merge(source, obj) {
  return _.extend({}, source, obj);
}

// TODO: account for game info attributes ...
let emptyBoard = {
  boardSize: 19,
  currentTurn: "B",
  stones: {}
}

function replayMoves(node) {
  let previous = node._parent ? replayMoves(node._parent) : emptyBoard;
  if (node.W || node.B) {
    return playMove(previous, _.pick(node, "B", "W"));
  } else {
    // TODO: use the initial game state to set up board (size, handicap, move)
    return previous;
  }
}

let initialState = {
  nodes: [],
  gameInfo: {},
  currentNode: null,
  board: emptyBoard
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
    case "NAVIGATE_START": {
      let currentNode = state.nodes[0];
      let board = emptyBoard;
      return merge(state, { currentNode, board });
    }
    case "NAVIGATE_BACK": {
      if (state.currentNode && state.currentNode._parent) {
        let currentNode = state.currentNode._parent;
        let board = state.board.previous;
        return merge(state, { currentNode, board });
      } else {
        return state;
      }
    }
    case "NAVIGATE_FORWARD": {
      if (state.currentNode && state.currentNode._next) {
        let currentNode = state.currentNode._next;
        let board = playMove(state.board, currentNode);
        return merge(state, { currentNode, board });
      } else {
        return state;
      }
    }
    case "NAVIGATE_END": {
      var currentNode = state.currentNode;
      while (currentNode._next) {
        currentNode = currentNode._next;
      }
      let board = replayMoves(currentNode);
      return merge(state, { currentNode, board });
    }
    case "NAVIGATE_TO_MOVE": {
      let currentNode = action.move;
      let board = replayMoves(currentNode);
      return merge(state, { currentNode, board });
    }
    case "PLAY_MOVE": {
      let color = state.board.currentTurn;
      let currentNode = {
        [color]: action.coordinates,
        _parent: state.currentNode,
      };

      if (state.currentNode) {
        if (state.currentNode._next) {
          let next = [currentNode].concat(state.currentNode._next);
          state.currentNode._next = next;
        }
        else {
          state.currentNode._next = currentNode;
        }
      }

      try {
        let board = playMove(state.board, currentNode);
        return merge(state, { currentNode, board });
      } catch(err) {
        if (err.name === "InvalidMoveException") {
          console.error(err);
          return state;
        }
        else {
          throw err;
        }
      }
    }
    default:
      return state;
  };
};

export default combineReducers({
  router: routerStateReducer,
  sgf: SGFReducer
});
