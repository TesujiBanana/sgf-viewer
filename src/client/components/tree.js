import _ from "underscore";
import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

class Tree extends React.Component {

  render() {
    console.log(this.props.moves);
    return (
      <ul>{this.props.moves.map((move, i) => {
        console.log(move);
        if (move.B) {
          return <li key={i}>Black: {move.B}</li>
        } else if (move.W) {
          return <li key={i}>White: {move.W}</li>
        }
      })}</ul>
    );
  }
}

function getMoveList(currentNode) {
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

function mapStateToProps(state) {
  return { moves: getMoveList(state.sgf.currentNode) };
}

export default connect(mapStateToProps)(Tree);
