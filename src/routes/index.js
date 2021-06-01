import React from "react";
import Welcome from "../components/welcome";
import About from "../components/about";
import Profile from "../components/profile";
import { Switch, Route } from "react-router-dom";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route path="/about" component={About} />
      <Route path="/profile" component={Profile} />
    </Switch>
  );
}
