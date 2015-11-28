"use strict";

export function playMove(coords) {
  return {
    type: "PLAY_MOVE",
    coordinates: coords
  }
}

export default {playMove};
