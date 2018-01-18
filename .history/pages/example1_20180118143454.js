import React, { Component } from "react";
import Page from "../layouts/main";

class Caffeinate extends Component {
  state = { coffee: "Americano" };
  render() {
    return this.props.children(this.state.coffee);
  }
}

export default () => (
  <Page>
    <Caffeinate>{beverage => <div>Drinking an {beverage}.</div>}</Caffeinate>,
  </Page>
);
