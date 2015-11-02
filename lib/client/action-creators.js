"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadSGFFromGist = loadSGFFromGist;

var _isomorphicFetch = require("isomorphic-fetch");

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadSGFFromGist() {
  return {
    type: "LOAD_SGF"
  };
};