"use strict";

export function navigateBack() {
  return {
    type: "NAVIGATE_BACK"
  }
}

export function navigateStart() {
  return {
    type: "NAVIGATE_START"
  }
}

export function navigateForward() {
  return {
    type: "NAVIGATE_FORWARD"
  }
}

export function navigateEnd() {
  return {
    type: "NAVIGATE_END"
  }
}

export function navigateToMove(move) {
  return {
    type: "NAVIGATE_TO_MOVE",
    move: move
  }
}
