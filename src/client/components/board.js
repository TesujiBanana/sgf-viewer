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

  renderLines(direction, size, boardSize) {
    let interval = size / (boardSize);
    let margin = interval / 2;

    let lineStyle = {
      stroke: "black",
      strokeWidth: "1px"
    };

    return _.times(boardSize, (i) => {
      let offset = margin + i * interval;
      let key = `line-${direction}-${i}`;
      if (direction === "vertical") {
        return <line key={key} x1={offset} x2={offset} y1={margin} y2={size-margin} style={lineStyle} />
      } else {
        return <line key={key} x1={margin} x2={size-margin} y1={offset} y2={offset} style={lineStyle} />
      }
    })
  }

  renderVerticalLines(size, boardSize) {
    return this.renderLines("vertical", size, boardSize)
  }

  renderHorizontalLines(size, boardSize) {
    return this.renderLines("horizontal", size, boardSize)
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
          {this.renderVerticalLines(size, boardSize)}
          {this.renderHorizontalLines(size, boardSize)}
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
