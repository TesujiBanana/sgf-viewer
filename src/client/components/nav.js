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
        <span className="glyphicon glyphicon-fast-backward" aria-hidden="true" onClick={this.props.actions.navigateStart}/>
        <span className="glyphicon glyphicon-step-backward" aria-hidden="true" onClick={this.props.actions.navigateBack}/>
        <span className="glyphicon glyphicon-step-forward" aria-hidden="true" onClick={this.props.actions.navigateForward}/>
        <span className="glyphicon glyphicon-fast-forward" aria-hidden="true" onClick={this.props.actions.navigateEnd}/>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  let actionCreators = { navigateStart, navigateBack, navigateForward, navigateEnd };
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(null, mapDispatchToProps)(Nav);
