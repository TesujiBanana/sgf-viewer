import { Route, IndexRoute} from "react-router";
import React from "react";

import App from "./app";
import Gist from "./components/gist";

export default (
  <Route component={App} path="/">
    <Route component={Gist} path="/g/**" />
  </Route>
);
