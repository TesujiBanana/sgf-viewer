import React from "react";

import Board from "./board";
import Nav from "./nav";
import Tree from "./tree";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { playMove } from "../action_creators/gameplay";


class Main extends React.Component {

  handleBoardClick(coords) {
    this.props.actions.playMove(coords);
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

function mapDispatchToProps(dispatch) {
  // let actionCreators = { navigateStart, navigateBack, navigateForward, navigateEnd };
  let actionCreators = { playMove };
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(null, mapDispatchToProps)(Main);
