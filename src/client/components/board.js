import _ from "underscore";
import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

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

  handleMouseMove(e) {
    console.log(e);
  }

  getDefs() {
    return { __html: `
      <filter id="white-stone-shadows" x="-50%" y="-50%" width="200%" height="200%">
        <feComponentTransfer in=SourceAlpha>
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feGaussianBlur stdDeviation="4"/>
        <feOffset dx="-2" dy="-2" result="offsetblur"/>
        <feFlood flood-color="#d0d0d0"/>
        <feComposite in2="offsetblur" operator="in"/>
        <feComposite in2="SourceAlpha" operator="in" />
        <feMerge result="inset">
          <feMergeNode in="SourceGraphic" />
          <feMergeNode />
        </feMerge>

      	<feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
    		<feOffset dx="2" dy="2" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5"/>
        </feComponentTransfer>
        <feComposite in2="offsetblur" operator="in" result="drop"/>

    		<feMerge>
          <feMergeNode in="drop"/>
          <feMergeNode in="SourceGraphic"/>
    			<feMergeNode in="inset"/>
    		</feMerge>
    	</filter>

      <filter id="black-stone-shadows" x="-50%" y="-50%" width="200%" height="200%">
        <feComponentTransfer in=SourceAlpha>
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feGaussianBlur stdDeviation="4"/>
        <feOffset dx="2" dy="2" result="offsetblur"/>
        <feFlood flood-color="black"/>
        <feComposite in2="offsetblur" operator="in"/>
        <feComposite in2="SourceAlpha" operator="in" />
        <feMerge result="inset">
          <feMergeNode in="SourceGraphic" />
          <feMergeNode />
        </feMerge>

      	<feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
    		<feOffset dx="2" dy="2" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5"/>
        </feComponentTransfer>
        <feComposite in2="offsetblur" operator="in" result="drop"/>

    		<feMerge>
          <feMergeNode in="drop"/>
          <feMergeNode in="SourceGraphic"/>
    			<feMergeNode in="inset"/>
    		</feMerge>
    	</filter>
    `};
  }

  renderGrid(boardSize, unit, margin) {
    let gridSize = (boardSize - 1) * unit;

    let style = {
      stroke: "black",
      strokeWidth: "1px",
      fill: "None",
      shapeRendering: "crispEdges"
    };

    let horizontalLines = _.range(1, boardSize-1).map( (i) => {
      return `M${roundUp(margin)} ${roundUp(margin + i*unit)} h ${gridSize}`;
    });

    let verticalLines = _.range(1, boardSize-1).map( (i) => {
      return `M${roundUp(margin + i*unit)} ${roundUp(margin)} v ${gridSize}`;
    });

    let grid = [
      `M${roundUp(margin)} ${roundUp(margin)}`,
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

  renderStones(stones, boardSize, unit, margin) {
    function parseColor(m) {
      if (m.B) return 'B';
      if (m.W) return 'W'
    }
    function parseCoordinate(coords) {
      let offset = 'a'.charCodeAt(0);
      let x = coords.charCodeAt(0) - offset,
          y = coords.charCodeAt(1) - offset;

      return [x, y];
    }

    return _.chain(stones).keys().map(coords => {
      let color = stones[coords];
      let [x, y] = parseCoordinate(coords);

      let radius = 0.9 * (unit / 2);

      let style = {
        fill: color === "B" ? "#333333" : "white",
        filter: color === "B" ? "url(#black-stone-shadows)" : "url(#white-stone-shadows)"
      };

      return (
        <circle key={`move-${coords}`}
                r={radius}
                cx={margin + unit * x}
                cy={margin + unit * y}
                style={style} />
      );
    }).value();
  }

  renderStonePreview() {}

  render() {
    let svgSize = Math.min(this.state.height, this.state.width);
    let size = svgSize;

    let margin = 22;
    let unit = (size - margin * 2) / (this.props.boardSize - 1);

    let rectStyle = {
      fill: "#ffcc66",
    };

    return (
      <svg height={svgSize} width={svgSize}>
        <defs dangerouslySetInnerHTML={this.getDefs()} />

        <g onMouseMove={this.handleMouseMove}>
          <rect width={size} height={size} style={rectStyle} />
          {this.renderGrid(this.props.boardSize, unit, margin)}
          {this.renderStones(this.props.stones, this.props.boardSize, unit, margin)}
          {this.renderStonePreview()}
        </g>
      </svg>
    )
  }
}

function mapStateToProps(state) {
  // return state.sgf.board
  return {
    boardSize: state.sgf.board.boardSize,
    stones: state.sgf.board.stones,
    currentTurn: state.sgf.board.currentTurn
  };
}

export default connect(mapStateToProps)(Board);
