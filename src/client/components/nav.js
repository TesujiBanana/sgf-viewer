import React from "react";
import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { navigateStart, navigateBack, navigateForward, navigateEnd } from "../action_creators/navigation";

class Nav extends React.Component {

  render() {
    let style = {
      textAlign: "center"
    };

    return (
      <div style={style}>
        <i className="fa fa-fast-backward" onClick={this.props.actions.navigateStart}/>
        <i className="fa fa-step-backward" onClick={this.props.actions.navigateBack}/>
        <i className="fa fa-step-forward" onClick={this.props.actions.navigateForward}/>
        <i className="fa fa-fast-forward" onClick={this.props.actions.navigateEnd}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  let actionCreators = { navigateStart, navigateBack, navigateForward, navigateEnd };
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(null, mapDispatchToProps)(Nav);
