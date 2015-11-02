import React from "react";
import { connect } from "react-redux";
import { loadSGFFromGist } from "../action-creators";

class Gist extends React.Component {

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    console.log("derp", this.props);
    return <div>"errp"</div>
  }
}


function mapStateToProps(state, ownProps) {
  console.log(state, ownProps);
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadSGFFromGist }, dispatch);
}

export default Gist; //connect(mapStateToProps)(Gist);

  //
  // <IndexRoute component={CPList} />
  // <Route component={CPShow} path="/content_partner/:id" />
