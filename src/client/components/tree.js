import _ from "underscore";
import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { getMovesFromNode } from "../utils";

class Tree extends React.Component {

  render() {
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

function mapStateToProps(state) {
  return { moves: getMovesFromNode(state.sgf.currentNode) };
}

export default connect(mapStateToProps)(Tree);
