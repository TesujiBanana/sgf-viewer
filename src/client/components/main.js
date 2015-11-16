import React from "react";

import Board from "./board";
import Nav from "./nav";
import Tree from "./tree";

export default class Main extends React.Component {

  render() {
    let divStyle: {
      height: "100%",
      width: "100%"
    };

    return (
      <div className="col-md-6">
        <Board />
        <Nav />
        <Tree />
      </div>)
  }
}
