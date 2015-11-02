"use strict";

import parser from "sgf-parser";

export function loadSGF(raw) {

  let sgf = parser.parse(raw);
  return {
    type: "RECEIVE_SGF",
    sgf: sgf
  }
};
