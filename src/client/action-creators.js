import fetch from 'isomorphic-fetch';

export function loadSGFFromGist() {
  return {
    type: "LOAD_SGF"
  };
};
