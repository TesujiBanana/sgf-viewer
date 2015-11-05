import React from "react";
import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { navigateBack, navigateForward } from "../action_creators";

class Nav extends React.Component {

  handleClickBack(e) {
    this.props.actions.navigateBack();
  }

  handleClickForward(e) {
    this.props.actions.navigateForward();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClickBack.bind(this)}>Back</button>
        <button onClick={this.handleClickForward.bind(this)}>Forward</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  let actionCreators = { navigateBack, navigateForward };
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(null, mapDispatchToProps)(Nav);
