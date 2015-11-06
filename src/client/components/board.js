import _ from "underscore";
import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { getMovesFromNode } from "../utils";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {height: 400, width: 400};
  }

  handleResize() {
    let svg = ReactDOM.findDOMNode(this);
    let height = svg.offsetHeight,
        width = svg.offsetWidth;

    this.setState({height, width});
  }

  render() {
    let margin = 20;
    let size = Math.min(this.state.height, this.state.width);
    let boardSize = this.props.boardSize;

    let svgHeight = size + margin * 2,
        svgWidth = size + margin * 2;

    let rectStyle = {
      fill: "#ffcc66",
    };

    let lineStyle = {
      stroke: "black",
      strokeWidth: "1px"
    };

    return (
      <svg height={svgHeight} width={svgWidth}>
        <g transform={`translate(${margin}, ${margin})`}>
          <rect width={size} height={size} style={rectStyle} />
          { _.times(boardSize, (i) => {
            let interval = size / (boardSize);
            let margin = interval / 2;
            let x = margin + i * interval;
            let key = `line-vertical-${i}`;
            return <line key={key} x1={x} x2={x} y1={margin} y2={size-margin} style={lineStyle} />
          })}
          { _.times(boardSize, (i) => {
            let interval = size / (boardSize);
            let margin = interval / 2;
            let y = margin + i * interval;
            let key = `line-horizontal-${i}`;
            return <line key={key} x1={margin} x2={size-margin} y1={y} y2={y} style={lineStyle} />
          })}
        </g>
      </svg>
    )
  }
}

function mapStateToProps(state) {
  return {
    boardSize: state.sgf.gameInfo.SZ || 19,
    moves: getMovesFromNode(state.sgf.currentNode)
  };
}

export default connect(mapStateToProps)(Board);
