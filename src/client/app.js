import React from "react";

export default class App extends React.Component {

  render() {
    console.log("errp");
    return <div>{this.props.children}</div>
  }
}
