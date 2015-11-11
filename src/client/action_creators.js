"use strict";

import parser from "sgf-parser";

export function loadSGF(raw) {

  let sgf = parser.parse(raw);
  return {
    type: "RECEIVE_SGF",
    sgf: sgf
  }
};

export function navigateBack() {
  return {
    type: "NAVIGATE_BACK"
  }
}

export function navigateForward() {
  return {
    type: "NAVIGATE_FORWARD"
  }
}

export function navigateToMove(move) {
  return {
    type: "NAVIGATE_TO_MOVE",
    move: move
  }
}
