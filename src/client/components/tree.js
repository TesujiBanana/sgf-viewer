import _ from "underscore";
import React from "react";
import ReactDOM from "react-dom";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { navigateToMove } from "../action_creators/navigation";

class Tree extends React.Component {

  renderStones(size, moves) {
    function parseColor(m) {
      if (m.B) return 'B';
      if (m.W) return 'W'
    }
    function parseCoordinate(m, color) {
      let offset = 'a'.charCodeAt(0);
      let x = m[color].charCodeAt(0) - offset,
          y = m[color].charCodeAt(1) - offset;

      return [x, y];
    }

    return moves.map( (m, i) => {
      let color = parseColor(m);
      let [x, y] = parseCoordinate(m, color);

      let interval = 25; //size / boardSize;
      // let margin = 10; //interval / 2;
      let radius = 9;

      let style = {
        fill: color === "B" ? "#333333" : "white",
        filter: color === "B" ? "url(#black-stone-shadows)" : "url(#white-stone-shadows)"
      };

      return (
        <circle key={`move-${i}`}
                r={radius}
                cx={10  + interval * i}
                cy={10 }
                style={style}
                onClick={this.props.actions.navigateToMove.bind(this, m)} />
      );
    });
  }

  render() {
    let margin = 20;
    // let svgSize = Math.min(this.state.height, this.state.width);
    let size = 440; //svgSize - margin * 2;

    let divStyle = {
      margin: 20,
      width: 440,
      height: 80,
      overflow: "scroll",
      background: "#ffcc66",
    };

    let svgHeight = 80,
        svgWidth = 20 + this.props.moves.length * 30;

    return (
      <div style={divStyle}>
        <svg height={svgHeight} width={svgWidth}>
          {this.renderStones(size, this.props.moves)}
        </svg>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let moves = state.sgf.nodes.filter(n => n.W || n.B);
  return { moves: moves };
}

function mapDispatchToProps(dispatch) {
  let actionCreators = { navigateToMove };
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree);
