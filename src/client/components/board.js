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

class Stone extends React.Component {
  render() {
    let radius = 0.9 * (this.props.unit / 2);

    let style = {
      fill: this.props.color === "B" ? "#333333" : "white",
      filter: this.props.color === "B" ? "url(#black-stone-shadows)" : "url(#white-stone-shadows)"
      // fill: color === "B" ? "black" : "white",
      // stroke: "black",
      // strokeWidth: "0.25px",
    };

    return <circle r={radius} style={style} />
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {size: 480};
  }

  svg() {
    ReactDOM.findDOMNode(this);
  }

  margin() {
    return this.state.size / (this.props.boardSize + 1);
  }

  unit() {
    return (this.state.size - this.margin() * 2) / (this.props.boardSize - 1)
  }

  parseCoordinate(coords) {
    let offset = 'a'.charCodeAt();
    let x = coords.charCodeAt(0) - offset,
        y = coords.charCodeAt(1) - offset;

    return [x, y];
  }

  toCoordinates(x, y) {
    let offset = 'a'.charCodeAt();
    return String.fromCharCode(offset + x) + String.fromCharCode(offset + y);
  }

  handleResize() {
    let svg = ReactDOM.findDOMNode(this);
    let height = svg.offsetHeight,
        width = svg.offsetWidth;

    this.setState({height, width});
  }

  handleMouseMove(e) {
    let svg = ReactDOM.findDOMNode(this);
    let margin = this.margin();
    let unit = this.unit();

    let {clientX, clientY} = e;
    let {offsetLeft, offsetTop} = svg;

    let x = parseInt((clientX - offsetLeft - margin + unit / 2) / unit);
    let y = parseInt((clientY - offsetTop - margin + unit / 2) / unit);

    console.log(this.toCoordinates(x, y));
    this.setState({preview: this.toCoordinates(x, y)});
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

  mergeBoardElements(...args) {
    let keys = _.union(..._.map(args, _.keys));

    let values = _.map(keys, k => {
      return _.chain(args)
        .map(_.property(k))
        .filter(Boolean)
        .value()
    })

    return _.object(keys, values)
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

  renderBoardElements(boardSize, unit, margin, boardElements) {

    return _.chain(boardElements).keys().map(coords => {
      let elements = boardElements[coords];
      let [x, y] = this.parseCoordinate(coords);

      let props = {
        key: coords,
        transform: `translate(${margin + unit * x}, ${margin + unit * y})`,
      };

      let children = _.map(boardElements[coords], (el, i, list) => {
        if (el == "B") {
          return <Stone key={i} color="B" unit={unit} />
        } else if (el == "W") {
          return <Stone key={i} color="W" unit={unit} />
        }
        else if (el == "circle") {
          let radius = 0.28 * unit;
          let color = _.contains(list.slice(0, i), "B") ? "white" : "black";

          let style = {
            fill: "None",
            stroke: color,
            strokeWidth: unit / 12
          };
          return <circle key={`move-${coords}`} r={radius} style={style} />
        }
      });

      return React.createElement("g", props, children)
    }).value();

  }

  render() {
    let size = this.state.size;
    let unit = this.unit();
    let margin = this.margin();

    let rectStyle = {
      fill: "#ffcc66",
    };

    let boardElements = this.mergeBoardElements(this.props.stones, this.props.decoration)

    return (
      <svg height={size} width={size} onMouseMove={this.handleMouseMove.bind(this)}>
        <defs dangerouslySetInnerHTML={this.getDefs()} />

        <g>
          <rect width={size} height={size} style={rectStyle} />
          {this.renderGrid(this.props.boardSize, unit, margin)}
          {this.renderBoardElements(this.props.boardSize, unit, margin, boardElements)}
        </g>
      </svg>
    )
  }
}

function getLastMove(node) {
  if (!node) return undefined
  if (node.B || node.W) return node;
  if (node._parent) return getLastMove(node._parent);
}

function getCoords(node) {
  if (!node) return undefined
  if (node.B) return node.B;
  if (node.W) return node.W;
}

function mapStateToProps(state) {
  let lastMove = getCoords(getLastMove(state.sgf.currentNode));
  let decoration = lastMove ? {[lastMove]: "circle"} : {}

  let {boardSize, stones} = state.sgf.board
  // let stones = state.sgf.board.stones
  // console.log(lastMove);

  return {
    boardSize,
    stones,
    decoration
    // currentTurn: state.sgf.board.currentTurn
  };
}

export default connect(mapStateToProps)(Board);
