import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { loadSGF } from "../action_creators";
import Gist from "./gist";

class SGFGist extends React.Component {

  handleOnLoad(files) {
    let sgf = files[0];
    this.props.loadSGF(sgf);
  }

  render() {
    return <Gist src={this.props.gist} onLoad={this.handleOnLoad.bind(this)} />
  }
}

function mapStateToProps(state, ownProps) {
  return {
    gist: state.router.params.splat
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadSGF }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SGFGist);
