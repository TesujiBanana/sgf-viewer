import React from "react";
import ReactDOM from "react-dom";

export default class Goban extends React.Component {
  constructor(props) {
    super(props);
    this.state = {height: 0, width: 0};
  }

  componentDidMount() {
    this.setSize();
  }

  setSize() {
    let svg = ReactDOM.findDOMNode(this);
    let height = svg.offsetHeight,
        width = svg.offsetWidth;

    this.setState({height, width});
  }

  render() {
    let size = Math.min(this.state.height, this.state.width);

    let rectStyle = {
      fill: "white",
      stroke: "black"
    };

    return (
      <svg>
        <g>
          <rect width={size} height={size} style={rectStyle} />
        </g>
      </svg>
    )
  }
}
