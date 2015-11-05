import React from "react";
import ReactDOM from "react-dom";

export default class Goban extends React.Component {
  constructor(props) {
    super(props);
    this.state = {height: 400, width: 400};
  }

  // componentDidMount() {
  //   this.handleResize();
  //   window.addEventListener('resize', this.handleResize);
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.handleResize);
  // }

  handleResize() {
    let svg = ReactDOM.findDOMNode(this);
    let height = svg.offsetHeight,
        width = svg.offsetWidth;

    console.log(height, width);
    this.setState({height, width});
  }

  render() {
    let margin = 20;
    let size = Math.min(this.state.height, this.state.width);

    let svgHeight = size + margin * 2,
        svgWidth = size + margin * 2;

    let rectStyle = {
      fill: "white",
      stroke: "black",
      strokeWidth: "1px"
    };

    return (
      <svg height={svgHeight} width={svgWidth}>
        <g transform={`translate(${margin}, ${margin})`}>
          <rect width={size} height={size} style={rectStyle} />
        </g>
      </svg>
    )
  }
}
