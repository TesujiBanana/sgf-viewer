import { Route, IndexRoute} from "react-router";
import React from "react";

import App from "./app";
import SGFGist from "./components/sgf_gist";

export default (
  <Route component={App} path="/">
    <Route component={SGFGist} path="/g/*" />
  </Route>
);
