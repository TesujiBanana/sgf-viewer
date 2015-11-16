"use strict";

import React from "react";

import Main from "./components/main";

class App extends React.Component {

  render() {
    return (<div className="container-fluid">{this.props.children}<Main /></div>)
  }
}

export default App;
