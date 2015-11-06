import _ from "underscore";

export function getMovesFromNode(currentNode) {
  var node = currentNode;
  var moves = [];
  while (node) {
    let move = _.pick(node, "B", "W"); // TODO: account for placements
    if (!_.isEmpty(move)) {
      moves.unshift(move);
    }
    node = node._parent;
  }
  return moves;
}
