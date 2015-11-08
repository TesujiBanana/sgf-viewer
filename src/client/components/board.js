import _ from "underscore";
import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { getMovesFromNode } from "../utils";

// Hack! If 1px lines are drawn on whole numbers with shape-rendering set to
// crispEdges, it's drawing a 2px line ... so offset it by a fraction.
function roundUp(x) {
  if (Math.floor(x) === x) {
    return x + 0.25;
  } else {
    return x
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {height: 480, width: 480};
  }

  handleResize() {
    let svg = ReactDOM.findDOMNode(this);
    let height = svg.offsetHeight,
        width = svg.offsetWidth;

    this.setState({height, width});
  }

  renderGrid(size, boardSize) {
    let interval = size / boardSize;
    let margin = interval / 2;
    let gridSize = size - margin * 2;

    let style = {
      stroke: "black",
      strokeWidth: "1px",
      fill: "None",
      shapeRendering: "crispEdges"
    };

    let horizontalLines = _.range(1, boardSize-1).map( (i) => {
      return [`M${roundUp(margin)} ${roundUp(margin + i*interval)}`, `h ${roundUp(gridSize)}`];
    });

    let verticalLines = _.range(1, boardSize-1).map( (i) => {
      return [`M${roundUp(margin + i*interval)} ${roundUp(margin)}`, `v ${roundUp(gridSize)}`];
    });

    let grid = [
      `M${margin} ${margin}`,
      `h ${gridSize}`,
      `v ${gridSize}`,
      `h ${-gridSize}`,
      `v ${-gridSize}`,
      "Z",
      ...verticalLines,
      ...horizontalLines
    ]

    return <path d={grid.join(" ")} style={style} />
  }

  renderStones(size, boardSize, moves) {
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

      let style = {
        fill: color === "B" ? "black" : "white"
      }

      let interval = size / boardSize;
      let margin = interval / 2;

      return (<circle r={margin} cx={margin + interval * x} cy={margin + interval * y} style={style} />)
    });
  }

  render() {
    let margin = 20;
    let svgSize = Math.min(this.state.height, this.state.width);
    let size = svgSize - margin * 2;

    let rectStyle = {
      fill: "#ffcc66",
    };

    return (
      <svg height={svgSize} width={svgSize}>
        <g transform={`translate(${margin}, ${margin})`}>
          <rect width={size} height={size} style={rectStyle} />
          {this.renderGrid(size, this.props.boardSize)}
          {this.renderStones(size, this.props.boardSize, this.props.moves)}
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
