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
  console.log("eerp");
  return {
    type: "NAVIGATE_BACK"
  }
}

export function navigateForward() {
  console.log("derp");
  return {
    type: "NAVIGATE_FORWARD"
  }
}
