import React from "react";

import Board from "./board";
import Nav from "./nav";
import Tree from "./tree";

export default class Main extends React.Component {

  handleBoardClick(coords) {
    console.log(coords);
  }

  render() {
    let divStyle: {
      height: "100%",
      width: "100%"
    };

    let handleBoardClick = this.handleBoardClick.bind(this);

    return (
      <div className="col-md-6">
        <Board onClick={handleBoardClick}/>
        <Nav />
        <Tree />
      </div>)
  }
}
